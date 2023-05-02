import { Router } from "express";
import { login_POST, signup_POST } from "../Controllers/userControllers.js";
import { allPlan_GET, plan_GET, plan_POST } from "../Controllers/planController.js";
import requireAuth from "../middleware/reqAuth.js";
import { payment_POST } from "../Controllers/paymentController.js";
import { subscribe_POST } from "../Controllers/subscribeController.js";

const userRouter = Router()

userRouter.post('/signup', signup_POST)
userRouter.post('/login', login_POST)
userRouter.post('/payment/intent', payment_POST)
userRouter.post('/payment/subscribe', subscribe_POST)
userRouter.use(requireAuth)
userRouter.post('/plan', plan_POST)
userRouter.get('/plan', allPlan_GET)
userRouter.get('/plan/:id',plan_GET)

export default userRouter