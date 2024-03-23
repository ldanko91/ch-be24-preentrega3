import { config } from "dotenv";
config();

export const PassportConfig = {
  privateKey: process.env.JWT_PRIVATE_KEY,
}

