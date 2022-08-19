import mongoose from "mongoose";
const Schema = mongoose.Schema


const QnASchema = new Schema({
    Question: { type: String, required: true },
    Answer: { type: String, required: true },
    Year: { type: Number, required: true },
    Month: { type: Number, required: true },
    Understood:{type:Boolean, required:true},
    Accuracy:{type:Number, required:true}
},{timestamps:true})

const QnAModel = mongoose.model("QnAModel", QnASchema)

export default QnAModel