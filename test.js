require("dotenv").config();
const express = require('express')
const router = require('./router/router')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 5000
const errorMiddleware = require('./middleware/error-middleware')
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use('/api', router)
app.use(errorMiddleware)

const start = async () => {
    try{
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    }catch (e){
        console.log(e)
    }
}

start()