import mongoose from "mongoose";
const Schema = mongoose.Schema


const commentSchema = new Schema({
    comment: {type:String, required:true},
},{timestamps:true})

const commentModel = mongoose.model("commentModel", commentSchema)

export default commentModel