import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const Schema = mongoose.Schema

const userModel = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    }
})

userModel.statics.signup = async function (firstName, lastName, email, username, password) {
    
    //check 
    //validation first , empty check
    if (!firstName && !email && !lastName && !password && !username) {
        throw Error('Please fill up the sign up form')
    }
    // email check
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    //password check
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong! Password should include at least one Upper letter,Lower Letter , numbers and signs')
    }

    const emailExist = await this.findOne({ email })
    if (emailExist) {
        throw Error('Email already registered')
    }

    //password hashing adding salt
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ firstName, email, lastName,username, password: hash})

    return user 

}

userModel.statics.login = async function (emailOrUsername, password) {
    //validation first , empty check
    if (!emailOrUsername || !password) {
        throw Error('Please fill up the sign up form')
    }
    //email check and password match
    const user = await this.findOne({ email: emailOrUsername }) ? await this.findOne({ email: emailOrUsername }) : await this.findOne({ username: emailOrUsername })

    console.log(user)
    if (!user) {
        throw Error('Email or username is incorrect or not existed')
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Password or email or username is incorrect')
    }

    return user
}



const Saver = mongoose.model('saver', userModel)

export default Saver
