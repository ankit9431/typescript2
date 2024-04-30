import mongoose from 'mongoose'

const songSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    track:{
        type:String,
        
    },
    artist:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    }
    
})

const Song=mongoose.model('Song',songSchema)

export default Song