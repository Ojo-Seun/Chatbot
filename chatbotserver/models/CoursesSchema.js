import mongoose from "mongoose";
const Schema = mongoose.Schema


const CourseShema = new Schema({

    title: { type: String, required: true, unique:true },
    abbr: { type: String, required: true },
    faculty:{type:String}, 
    description: {type:String,required:true},
    duration: {
        fullTime: {type:String,required:true},
        partTime:{type:String,required:true, default:"Not available"}
    },
    requirement:{type:String,required:true},
    tuition:{type:String,required:true} ,
    url:{type:String,required:true},
    applicationPeriod: {type:String,required:true},
    startDate: {type:String,required:true},
    studyMode: {type:String, required:true},
    apply: { type: String, required: true },
    contact: {
            email: {type:String, required:true},
            phoneNumber: {type:String, required:true},
            programDirector:{type:String}
        }
},{timestamps:true})


const CoursesModel = mongoose.model('CoursesModel', CourseShema)
export default CoursesModel