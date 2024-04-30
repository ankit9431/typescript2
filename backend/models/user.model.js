import express from 'express'
import mongoose from 'mongoose'
import validator from 'validator'
import bycrpt from 'bcrypt'
const userSchema= new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:[true,'please enter your email'],
        validate:[validator.isEmail]
    },
    userName:{
        type:String,
        required:[true,'please enter your name'],
        minLength:[3,'Name must be atleast 3']
    },
    
    firstName:{
        type:String,
        required:true
        

    },
    lastName:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:true
    },
},{timestamps:true})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password=await bycrpt.hash(this.password,10)
});
userSchema.methods.matchPassword=async function(enteredPassword){
    return await bycrpt.compare(enteredPassword,this.password)
}
const User=mongoose.model('User',userSchema)
export default User