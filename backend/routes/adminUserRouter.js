import express from "express";
import AdminUser from "../models/adminUserSchema.js";
import expressAsyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import { generateToken, isAuth } from "../utils.js";
const router = express.Router()



router.post('/register', expressAsyncHandler(async (req, res, next) => {
    const isUser = await AdminUser.findOne({ email: req.body.email });
    if (isUser) {
        return res.status(409).send({ ERROR: isUser.email + " is already exist" });

        
    } else {
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if (err) {
                res.status(500).json({
                    ERROR: err
                })
            } else {

                const registeredAdminUser =  new AdminUser({
                    name: req.body.name,
                    email: req.body.email,
                    isAdmin: req.body.isAdmin,
                    createdOn: Date.now(),
                    password: hash
                });

                registeredAdminUser.save().then(result => {
                    res.status(201).json({
                        message: `Hello ${result.name} you have successfully registered`,
                        _id: result._id,
                        name: result.name,
                        email: result.email,
                        isAdmin:result.isAdmin,
                        Token: generateToken(result)
                    })
                }).catch(err => {
                    res.status(500).json({ERROR:'Registration failed'})
                })

            }
        })

    }

}));



router.post('/login', expressAsyncHandler(async (req, res) => {
    const isUser = await AdminUser.findOne({ email: req.body.email });
    if (isUser === null) {
        
        return res.status(401).send({ ERROR: "Incorrect email" });
        
    } else {

        let result = await bcrypt.compareSync(req.body.password, isUser.password);

        if (result) {
            
            return res.status(200).send({
                _id: isUser._id,
                name: isUser.name,
                email: isUser.email,
                isAdmin:isUser.isAdmin,
            Token: generateToken(isUser)
            });
        } else {
            return res.status(401).send({ERROR:"Incorrect password"})
        }
    }
}))


// router.post('/login', expressAsyncHandler(async (req, res) => {
//     let user = await AdminUser.findOne({ email: req.body.email });
//     if (user === null) {
        
//         return res.status(401).send({ ERROR: "Incorrect email" });
        
//     } else {

//         let result = bcrypt.compare(req.body.password, user.password);

//         if (result) {
            
//             return res.status(200).json({
//                 _id: user._id,
//                 name: user.name,
//                 email:user.email,
//             Token: generateToken(user)
//             });
//         } else {
//             return res.status(401).send({ERROR:"Incorrect password"})
//         }
//     }
// }))

export default router