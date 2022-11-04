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
/*
{
    "password" : "123456",
    "email" : "dsfsdfds",
    "firstName" : "dsfsf",
    "lastName" : "dfsfsdfds",
    "age" : 12,
    "address" : "dfsdfs"
}
*/
