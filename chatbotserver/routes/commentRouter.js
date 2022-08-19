import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import commentModel from '../models/commentSchema.js'
import { isAuth } from '../utils.js'
const router = express.Router()


router.post('/addComment', expressAsyncHandler(async (req, res) => {
    const comment = new commentModel({
        comment:req.body.comment
    })

    comment.save().then(result => {
        res.status(200).json({
            comment:result
        })
    })
}))


router.get('/getComments', expressAsyncHandler(async (req, res) => {
    const comments = await commentModel.find()
    res.status(200).json({
        comments
    })
}))

router.delete('/deleteComment/:_id', isAuth, expressAsyncHandler(async (req, res) => {
    const _id = req.params._id
    await commentModel.deleteOne({_id:_id}).then(result => {
        res.status(200).json({
            message:result.acknowledged
        })
    }).catch(err => {
        res.status(500).json({
            Error:err.message
        })
    })
}))

export default router