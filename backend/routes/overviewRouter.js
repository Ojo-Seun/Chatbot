import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import QnAModel from '../models/QnASchema.js'
import userModel from '../models/userSchema.js'
import { isAuth } from '../utils.js'
const router = express.Router()






router.get('/getOverview', isAuth, expressAsyncHandler(async (req, res) => {
    const now = new Date()
    const Year = now.getFullYear()
    const Month = now.getMonth()
    const QnAs = await QnAModel.find({ Year: Year, Month: Month })
    const Total_User_Per_Month = (await userModel.find({ Year: Year, Month: Month })).length
    const Total_User = (await userModel.find()).length
    const Total_Query =  QnAs.length
    const Understood_Query = (QnAs.filter(x=>x.Understood === true)).length
    const Sum_Accuracy = QnAs.reduce((a, c) => a + c.Accuracy, 0)
    const Average_Accuracy = (Sum_Accuracy/Total_Query).toFixed()

    const overview = {
    Year,
    Month,
    Total_User,
    Total_User_Per_Month,
    Total_Query,
    Understood_Query,
    Average_Accuracy
    }

    res.status(200).json(overview)
        
        
}))

export default router