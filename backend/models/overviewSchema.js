import mongoose from 'mongoose'
const Schema = mongoose.Schema


const overviewSchema = new Schema({
    Year:{type:Number, required:true},
    Month:{type:Number, required:true},
    Total_User:{type:Number, required:true},
    Average_User:{type:Number, required:true},
    Total_Query:{type:Number, required:true},
    Understood_Query:{type:Number, required:true},
    Average_Accuracy:{type:Number, required:true},
})
    
const overviewModel = mongoose.model("overviewModel", overviewSchema)
export default overviewModel
