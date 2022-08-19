import express from "express";
import cors from 'cors'
import mongoose from "mongoose";
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import path from "path"
const app = express()

import adminUserRouter from './routes/adminUserRouter.js'
import dialogflowApiRouter from './routes/dialogflowApiRouter.js'
import coursesRouter from './routes/coursesRouter.js'
import userRouter from './routes/userRouter.js'
import commentRouter from './routes/commentRouter.js'
import QnARouter from './routes/QnARouter.js'
import overviewRouter from './routes/overviewRouter.js'
import messageRouter from './routes/messageRouter.js'
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
dotenv.config()
app.use(cors())

mongoose.connect(process.env.ATLAS_URL)
  .then(() => {
    console.log('Chatbot connected');
  })
  .catch((err) => {
    console.log(err.message);
  });



app.use('/dialogflowApi', dialogflowApiRouter)
app.use('/api/admin', adminUserRouter)
app.use('/api/courses', coursesRouter)
app.use('/api/user', userRouter)
app.use('/api/comments', commentRouter)
app.use('/api/QnAs', QnARouter)
app.use('/api/overview', overviewRouter)
app.use('/api/messages', messageRouter)


if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/build')));
  app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
  );
}
  













  app.use((err, req, res, next) => {
  res.status(500).send({message:err.message})
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running at ${port}`)
})