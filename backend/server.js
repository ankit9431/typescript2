import express from 'express'
import connectDB from './db/db.js'
import userRouter from './routes/user.route.js'
import userSongs from './routes/song.router.js'
import cors from 'cors'
import dotenv from 'dotenv'
const app=express()
const PORT=5002
connectDB()
app.use(cors())
dotenv.config()
app.use(express.json())
const server=app.listen(5002,()=>{
    console.log('server started')
})
app.use('/api/user',userRouter)
app.use('/api/songs',userSongs)

