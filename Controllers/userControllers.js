import Saver from "../Models/userModel.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//token creation 
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1d' })
}

export const signup_POST = async (req, res) => {
    const { firstName, lastName, email,username,password } = req.body
    
    try {
        const user = await Saver.signup(firstName, lastName, email,username, password)
        const token = createToken(user._id)
        // req.user_id = await UserApp.findById(user._id).select("_id")
        res.status(200).json({ firstName, email, lastName, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const login_POST = async (req, res) => {
    const { emailOrUsername, password } = req.body
    console.log(emailOrUsername)
    
    try {
        const user = await Saver.login(emailOrUsername, password)
        const token = createToken(user._id)
        res.status(200).json({ token, firstName: user.firstName, lastName: user.lastName })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}