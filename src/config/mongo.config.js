import { config } from "dotenv";
config()

export const mongoConfig = {
    MongoUrl: process.env.DB_URL,

}