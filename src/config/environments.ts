import { config } from 'dotenv'
config()

type EnvConfig = {
    DB_URL: string
}

const dev: EnvConfig = {
    DB_URL: `mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`
}

const prod: EnvConfig = {
    DB_URL: ''
}

const DB_URL = dev.DB_URL;
export default DB_URL;