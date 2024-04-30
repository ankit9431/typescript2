import { catchAsyncError } from "../db/catchAsyncHandler.js";
import Song from "../models/song.model.js";



export const createSongs=catchAsyncError(async(req,res)=>{
    const{name,thumbnail,track}=req.body
    if(!name||!thumbnail||!track){
        return res.status(400).json({
            'error':"all fields are required"
        })
    }
    const artist=req.user._id
    const songDetails={name,thumbnail,track,artist};
    const createdSong=await Song.create(songDetails)
    return res.status(200).json(createdSong)
})
export const getAll=catchAsyncError(async(req,res)=>{
    const song=await Song.find().populate('artist');
    res.json(song);
})
