const jwt = require('jsonwebtoken')
const db = require('../database/db')

class TokenService{
    validateRefreshToken(refreshToken) {
        try {
            const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
            return userData
        } catch (e) {
            return null
        }
    }
    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        } catch (e) {
            return null
        }
    }
    generateToken(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }
    async saveToken(userId, refreshToken){
        const tokenData = await db.query('SELECT * FROM token WHERE id_user_token = $1', [userId])
        if (tokenData.rows.length){
            await db.query('UPDATE token SET token = $1 WHERE id_user_token = $2', [refreshToken, userId])
            return
        }
        await db.query('INSERT INTO token (id_user_token, token) VALUES ($1, $2)', [userId, refreshToken])
        return await db.query('SELECT * FROM token WHERE id_user_token = $1', [userId])
    }

    async removeToken(refreshToken){
        const tokenData = await db.query('SELECT * FROM token WHERE token = $1', [refreshToken])
        await db.query('DELETE FROM token WHERE token = $1', [refreshToken])
        return tokenData
    }
    async findToken(refreshToken){
        const tokenData = await db.query('SELECT * FROM token WHERE token = $1', [refreshToken])
        return tokenData
    }
}



module.exports = new TokenService()