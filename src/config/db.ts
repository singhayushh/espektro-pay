import mongoose, { CallbackError } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connect = mongoose.connect(
    String(process.env.MONGO_URI),
    {},
    (err: CallbackError) => {
        if (err) console.log(err);
        else console.log("DB connection established...");
    }
);

export default connect;
