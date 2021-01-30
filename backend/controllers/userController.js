import User from '../Models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/genarateToken.js'


//get token

const authUser = asyncHandler (async(req, res) =>{
   const {email,password} = req.body;

   const user = await User.findOne ({email})

   if(user && (await user.matchPassword(password))){
     res.json({
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
         token: generateToken(user._id),
     })
   } else{
       res.status (401)
       throw new Error ('Invalid email or password')
   }
})
// new users
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
  
    const userExists = await User.findOne({ email })
  
    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }
  
    const user = await User.create({
      name,
      email,
      password,
    })
  
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  })

//get user profile
const getUserProfile = asyncHandler (async(req, res) =>{
    res.send('success');
 })
 
export {authUser, getUserProfile,registerUser};
