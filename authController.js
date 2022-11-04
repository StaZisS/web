const db = require('./db');
class authController {
    async registration(req, res) {
        try {
            const {password, email, first_name, last_name, age, address} = req.body
            console.log(req.body)
            await db.query('INSERT INTO person (password, email, first_name, lastname, age, address)' +
                ' values ($1, $2, $3, $4, $5, $6) RETURNING *', [password, email, first_name, last_name, age, address],
                (err, result) => {
                    if (err) {
                        console.log(err.stack)
                    } else {
                        res.json(result.rows[0])
                    }
                });
        }catch (e){

        }
    }
    async login(req, res) {
        try {

        }catch (e){

        }
    }
    async updateUser(req, res) {
        try {

        }catch (e){

        }
    }
    async deleteUser(req, res) {
        try {

        }catch (e){

        }
    }
}
module.exports = new authController()