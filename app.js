import express from "express";
import mongoose from "mongoose";
import * as dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from "cors"
import userRouter from "./Routes/userRoutes.js";

dotenv.config()

//mongoose connection 
mongoose.connect(process.env.DB_URI)
    .then(() => console.log('connected to db'))
    .catch(() => console.log("connection failed"))

const app = express();


app.set('view engine', 'ejs');
//middleware 
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser());

//Routes
app.use(userRouter)




app.listen(process.env.PORT, () => {
    console.log('app is listening')
})

export default app