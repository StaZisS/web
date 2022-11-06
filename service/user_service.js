const db = require('../database/db')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('../service/mail_service')
const tokenService = require('../service/token_service')
const UserDto = require('../dtos/user_dto')
const ApiError = require('../exception/api-error')

class UserService {
    async registration(email, password, username) {
        const candidate = await db.query(`SELECT *
                                          FROM users
                                          WHERE (email = $1 or username = $2)`, [email, username])
        if (candidate.rows.length > 0) {
            if (candidate.rows[0].email === email) {
                throw ApiError.BadRequest(`User with this email ${email} already exists`)
            } else {
                throw ApiError.BadRequest(`User with this username ${username} already exists`)
            }
        }
        const hashPassword = await bcrypt.hashSync(password, 7)
        const activationLink = uuid.v4()
        await db.query('INSERT INTO users (email, password, username, activation_link) VALUES ($1, $2, $3, $4)',
            [email, hashPassword, username, activationLink])
        await mailService.sendMailActivation(email, `${process.env.API_URL}/api/activate/${activationLink}`)
        const person = await db.query('SELECT * FROM users WHERE email = $1', [email])
        const userDto = new UserDto(person.rows[0])
        const tokens = tokenService.generateToken({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }

    async activate(activationLink) {
        const user = await db.query('SELECT * FROM users WHERE activation_link = $1', [activationLink])
        if (!user.rows.length) {
            throw ApiError.BadRequest('Incorrect activation link')
        }
        await db.query('UPDATE users SET is_active = $1 WHERE activation_link = $2', [true, activationLink])
    }

    async login(email, password) {
        const user = await db.query('SELECT * FROM users WHERE email = $1', [email])
        if (!user.rows.length) {
            throw ApiError.BadRequest('User with this email not found')
        }
        const isPasswordEquals = await bcrypt.compare(password, user.rows[0].password)
        if (!isPasswordEquals) {
            throw ApiError.BadRequest('Incorrect password')
        }
        const userDto = new UserDto(user.rows[0])
        const tokens = tokenService.generateToken({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if (!userData || !tokenFromDb.rows.length) {
            throw ApiError.UnauthorizedError()
        }
        const user = await db.query('SELECT * FROM users WHERE id = $1', [userData.id])
        const userDto = new UserDto(user.rows[0])
        const tokens = tokenService.generateToken({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }
}
module.exports = new UserService()