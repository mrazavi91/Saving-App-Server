import Saver from '../Models/userModel.js'
import jwt from 'jsonwebtoken'

const requireAuth = async (req, res, next) => {

    //accessing to header and one of the header property is authorization 
    const { authorization } = req.headers
    //cehcking if the authorization has value???
    if (!authorization) {
        return res.status(401).json({ error: 'no value for authorization' })
    }

    //spliting the bearer from token so it looks like Bearer73y40894iue3

    const token = authorization.split(' ')[1]

    //verifyig the token using jwt, grab the id and attacth user to req  so we'll have it in controllers
    try {
        const { _id, username } = jwt.verify(token, process.env.SECRET)

        //only sending the id 
        req.user = await Saver.findById({ _id }).select("_id")
        next() //next handler function firing 
    } catch (error) {
        console.log(error)
        res.status(401).json({ error: 'request not authorized' })
    }


}

export default requireAuth