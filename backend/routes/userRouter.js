import express from 'express'
const router = express.Router()
import expressAsyncHandler from 'express-async-handler'
import userModel from '../models/userSchema.js'
import { isAuth } from '../utils.js'








router.post('/addUserEmail', expressAsyncHandler(async (req, res) => {
    const now = new Date()
    const Year = now.getFullYear()
    const Month = now.getMonth()
    const isExist = await userModel.findOne({ userEmail: req.body.userEmail })
    if (isExist) {
        res.status(200).json({
            message:`${isExist.userEmail} is already exist`
        })
        return
    }
    
    const email =  new userModel({
        userEmail: req.body.userEmail,
        Year: Year,
        Month:Month
    })

    await email.save().then(result => {
        res.status(200).json({
            email
        })
    }).catch(err => {
        res.status(500).json({
            Err:err.message
        })
    })

}))


router.delete('/deleteUserEmail/:_id', isAuth, expressAsyncHandler(async (req, res) => {
    const _id = req.params._id
    await userModel.deleteOne({ _id: _id })
        .then(result => {
            res.status(200).json({
                message:"Email Deleted"
            })
        }).catch(err => {
            return
        })
    
}))


export default router