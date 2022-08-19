import mongoose from "mongoose";
const Schema = mongoose.Schema


const userSchema = new Schema({
    userEmail: { type: String, required: true, unique:true },
    Year: { type: Number, required: true },
    Month:{type:Number, required:true}
},{timestamps:true})

const userModel = mongoose.model("userModel", userSchema)

export default userModel