const db = require('./db')
const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const {secret} = require('./config')

const generateAccessToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload, secret, {expiresIn: '12h'})
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()){
                return res.status(400).json({message: 'Registration error ', errors})
            }
            const {password, email, first_name, last_name, age, address} = req.body
            console.log(req.body) // need delete, debug
            const candidate = await db.query(`SELECT * FROM person WHERE email = $1`, [email])
            if (candidate.rows.length > 0) {
                return res.status(400).json({message: 'User already exists'})
            }
            const hashPassword = await bcrypt.hashSync(password, 7)
            await db.query('INSERT INTO person (password, email, first_name, last_name, age, address, role)' +
                ' values ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [hashPassword, email, first_name, last_name, age, address, "USER"],
                (err, result) => {
                    if (err) {
                        console.log(err.stack)
                        res.status(400).json({message: 'Registration error, BD error'})
                    } else {
                        res.json(result.rows[0]) // need delete, debug
                        res.json({message: 'User was created'})
                    }
                });
        }catch (e){
            res.status(400).json({message: 'Registration error'})
        }
    }
    async login(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()){
                return res.status(400).json({message: 'Registration error ', errors})
            }
            const {email, password} = req.body
            const user = await db.query('SELECT * FROM person WHERE email = $1', [email])
            if (user.rows.length === 0) {
                return res.status(400).json({message: 'User not found'})
            }
            const validPassword = bcrypt.compareSync(password, user.rows[0].password)
            if (!validPassword) {
                return res.status(400).json({message: 'Invalid password'})
            }
            const token = generateAccessToken(user.rows[0].id)
            return res.json({token})
        }catch (e){
            console.log(e) // need delete, debug
            res.status(400).json({message: 'Login error'})
        }
    }
    async updateUser(req, res) {
        try {

        }catch (e){
            res.status(400).json({message: 'Update user error'})
        }
    }
    async deleteUser(req, res) {
        try {

        }catch (e){
            res.status(400).json({message: 'Delete user error'})
        }
    }
}
module.exports = new authController()