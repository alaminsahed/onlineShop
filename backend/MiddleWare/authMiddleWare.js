import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler';
import user from '../Models/userModel.js'

//token authorization for user profile.
const protect = asyncHandler(async (req, res, next) =>{
    let token 

    console.log(req.headers.authorization &&req.headers.authorization.startsWith('Bearer'))
    {
        try{
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            console.log(decoded)

            next()

        } catch (error){}
    }

    if(!token){
        res.status(401)
        throw new Error('Not authorize or no token')
    }

   
})

export {protect}
