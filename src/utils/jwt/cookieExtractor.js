import { config } from "dotenv";
config();
const tokenKey = process.env.TOKEN_KEY;


export const cookieExtractor = req => {
    if (req && req.cookies) {
        return req.cookies[tokenKey] || null
    }
    return null
}