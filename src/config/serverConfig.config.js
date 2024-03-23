import { config } from "dotenv";
config()

export const serverConfig = {
    ExpressPort: process.env.EXPRESS_PORT,

}