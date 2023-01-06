import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import express from "express";
import connect from "./config/db";
import indexRouter from "./routes/index.route";
import cookieParser from "cookie-parser";

dotenv.config();

const app: express.Application = express();
const port: Number = Number(process.env.PORT || 3000);

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(express.static(path.join(__dirname, "../static")));

app.use("/", indexRouter);

app.listen(port, () => {
    console.log(`Web server running at port ${port}`);
    connect;
});
