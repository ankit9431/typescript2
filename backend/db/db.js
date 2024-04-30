import mongoose from "mongoose"
async function connectDB(){
    try{
        const connect =await mongoose.connect('mongodb+srv://ankitsharma2052001:ankit123@cluster0.dkltzik.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{

        });
        console.log('mongo connected')
    }catch(error){
        console.log(`Error:${error.message}`)
        process.exit()
    }
}
export default connectDB