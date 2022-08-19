import mongoose from "mongoose";
const Schema = mongoose.Schema


const messageSchema = new Schema({
    From: {type:String, required:true},
    To: {type:String, required:true},
    Subject: {type:String, required:true},
    Text:{type:String, required:true}
})

const messageModel = mongoose.model("messageModel", messageSchema)

export default messageModel