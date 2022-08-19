import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import QnAModel from '../models/QnASchema.js'
import { isAuth } from '../utils.js'
const router = express.Router()


router.post('/addQnA', expressAsyncHandler(async (req, res) => {
    const now = new Date()
    const QnA = new QnAModel({
        Question: req.body.Question,
        Answer: req.body.Answer,
        Year: now.getFullYear(),
        Month: now.getMonth(),
        Understood: req.body.Understood,
        Accuracy:req.body.Accuracy
    })

    QnA.save().then(result => {
        res.status(200).json({
            QnA:result
        })
    }).catch(err => {
        res.status(500).json({
            Err:err.message
        })
    })
}))


router.get('/getQnAs', isAuth, expressAsyncHandler(async (req, res) => {
    const QnAs = await QnAModel.find()
    res.status(200).json({
        QnAs
    })
}))

router.delete('/deleteQnA/:_id', isAuth, expressAsyncHandler(async (req, res) => {
    const _id = req.params._id
    await QnAModel.deleteOne({_id:_id}).then(result => {
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