import mongoose from "mongoose";
import { mongoConfig } from "../../config/mongo.config.js";

export const mongoConnection = () => mongoose.connect(mongoConfig.MongoUrl)