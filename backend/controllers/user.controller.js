import { protect } from "../db/auth.js";
import { catchAsyncError } from "../db/catchAsyncHandler.js";
import generateToken from "../db/jwtToken.js";
import User from "../models/user.model.js";


export const register=catchAsyncError(async(req,res,next)=>{
    const{ userName,email,firstName,password,lastName}=req.body
    if(!userName||!email ||!firstName  ||!password||!lastName){
        return res.status(400).json
        ({ error: "Missing required fields. Please provide all required fields." });
    }
    let userExist=await User.findOne({email:email})
    if(userExist){
        return res.status(200).json
        ({error:"user already exist"})
    }
    
    const user=await User.create({
        userName,
        email,
        firstName,
        lastName,
        password,
    })
    res.status(201).json({
        _id:user._id,
        userName:user.userName,
        email:user.email,
        firstName:user.firstName,
        lastName:user.lastName,
        token:generateToken(user._id)
    });
          

});

export const login = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            error: "Invalid email or password"
        });
    }

    // Find the user by email
    const user = await User.findOne({ email }).select('+password');

    // If user not found
    if (!user) {
        return res.status(400).json({
            error: "Invalid email or password"
        });
    }

    // Check if the provided password matches the hashed password in the database
    const isPasswordValid = await user.matchPassword(password);

    if (!isPasswordValid) {
        return res.status(400).json({
            error: "Invalid email or password"
        });
    }

    // Password is valid, generate token and send response
    if (user && isPasswordValid){
        res.json({
            _id:user._id,
            userName:user.userName,
            email:user.email,
            firstName:user.firstName,
            lastName:user.lastName,
            token:generateToken(user._id)
          });
          
    }
});