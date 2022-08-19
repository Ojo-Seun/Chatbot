import express from 'express'
import expressAsyncHandler from 'express-async-handler'
const router = express.Router()
import dotenv from 'dotenv'
dotenv.config()
import nodemailer from 'nodemailer'

import messageModel from '../models/messageSchema.js'
const pwd = process.env.EMAIL_PWD








router.post('/sendMessage', expressAsyncHandler(async (req, res) => {





const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'chatb40258@gmail.com',
    pass: pwd
  }
});

var mailOptions = {
  from: '"Chat Bot 👻" <chatb4025@gmail.com>',
  to: 'morilispantry@gmail.com',
  subject: 'Email From Hull ChatBot',
  text: req.body.text
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    return
  } else {
    console.log('Email sent: ' + info.response);
  }
});







    const message = new messageModel({
        From: req.body.From,
        To: req.body.To,
        Subject: req.body.Subject,
        Text:req.body.Text
        
    })

    await message.save().then(result => {
        res.status(200).json({
        message:"Thanks, your message was delivered we will get back to you soon"
    })
    }).catch(err => {
        return
    })
    
}))

export default router