import { config } from "dotenv";
import jwt from "jsonwebtoken";

config();
const PRIVATE_KEY = process.env.JWT_PRIVATE_KEY

export const generateToken = user => {
    const token = jwt.sign({ user }, PRIVATE_KEY)
    return token
}