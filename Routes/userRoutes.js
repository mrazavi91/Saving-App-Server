import { Router } from "express";
import { login_POST, signup_POST } from "../Controllers/userControllers.js";

const userRouter = Router()

userRouter.post('/signup', signup_POST)
userRouter.post('/login', login_POST)

export default userRouter