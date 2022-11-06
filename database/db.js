const {Client} = require('pg')
    const client = new Client({
    host: "localhost",
    port: 5432,
    database: "testnodejs",
    user: "postgres",
    password : "1489qq",
})
client.connect()
module.exports = client

//regisration

/*
{
    "password" : "123456",
    "email" : "dsfsdfds",
    "username" : "dsfsf",
}
*/

//delete user, login

/*
{
    "password" : "123456",
    "email" : "dsfsdfds"
}
*/

//update user

/*
{
    "password" : "123456",
    "email" : "dsfsdfds",
    "first_name" : "dsfsf",
    "last_name" : "dfsfsdfds",
    "age" : 12,
    "address" : "dfsdfs",
    "current_email" : "fdsfkm",
    "current_password" : "123456"
}
*/