const { Client } = require("pg")
const dotenv = require("dotenv")

dotenv.config()

const connectDb =  async () => {
    try {
        const client = new Client({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT
        })

           await client.connect()
            return client
            
       

    } catch (error) {
    console.log(error)
    }
}



module.exports = {connectDb}  ;