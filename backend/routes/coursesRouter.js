import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import CoursesModel from '../models/CoursesSchema.js'
const router = express.Router()
import { isAuth } from '../utils.js'


router.get('/getCourses', expressAsyncHandler(async (req, res) => {
    const courses = await CoursesModel.find()
    res.status(200).json({
        courses
    })
}))

router.get('/getCourse/:_id', expressAsyncHandler(async (req, res) => {
    const _id = req.params._id
    const course = await CoursesModel.findById(_id)
        .then(result => {
            res.status(200).json({
            course:result
            }).catch(err => {
                res.status(500).json({
                Err:err.message
            })
        })
    })

    
}))

router.post('/addCourse', isAuth, expressAsyncHandler(async (req, res) => {
    const isExist = await CoursesModel.findOne({ title: req.body.title })
    if (isExist) {
        res.status(200).json({
            message:`${isExist.title} is saved already`
        })
        return
    }
    const course = new CoursesModel({
        title: req.body.title,
        abbr: req.body.abbr,
        faculty: req.body.faculty,
        description: req.body.description,
        duration: req.body.duration,
        requirement: req.body.requirement,
        tuition: req.body.tuition,
        url:req.body.url,
        applicationPeriod: req.body.applicationPeriod,
        startDate: req.body.startDate,
        studyMode: req.body.studyMode,
        apply: req.body.apply,
        contact:req.body.contact
    })

    course.save().then(result => {
        res.status(200).json({
            message:"Course Saved"
        })
    }).catch(err => {
        res.status(500).json({
            message:err.message
        })
    })

}))


router.delete('/deleteCourse/:_id', isAuth, expressAsyncHandler(async (req, res) => {
    const _id = req.params._id
    await CoursesModel.deleteOne({ _id: _id })
        .then(result => {
            res.status(200).json({
                message:result.acknowledged
            })
        }).catch(err => {
            res.status(500).json({
                message:err.message
            })
        })

}))


router.put('/updateCourse/:_id', isAuth, expressAsyncHandler(async (req, res) => {
    const _id = req.params._id
        const course = await CoursesModel.findById(_id)
        if (course) {
        course.title= req.body.title || course.title
        course.abbr= req.body.abbr || course.abbr
        course.faculty= req.body.faculty || course.faculty
        course.description= req.body.description || course.description
        course.duration= req.body.duration || course.duration
        course.requirement= req.body.requirement || course.requirement
        course.tuition= req.body.tuition || course.tuition
        course.applicationPeriod= req.body.applicationPeriod || course.applicationPeriod
        course.startDate= req.body.startDate || course.startDate
        course.studyMode= req.body.studyMode || course.studyMode
        course.apply= req.body.apply || course.apply
        course.contact = req.body.contact || course.contact
            

            await course.save().then(result => {
            res.status(200).json({
                message:"Course Updated"
            })
        }).catch(err => {
            res.status(500).json({
                message:err.message
            })
        })
            
        } else {
            res.status(404).json({
                message:"Course Not Found"
            })
    }

        
    
    
        

}))

export default router