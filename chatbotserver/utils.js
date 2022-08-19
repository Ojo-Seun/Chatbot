import jwt from "jsonwebtoken"


export const generateToken = (adminUser) => {

    return jwt.sign({
        _id: adminUser._id,
        name: adminUser.name,
        email:adminUser.email
    },process.env.JWT_KEY,{expiresIn:"30d"})
}


export const isAuth = (req,res,next)=>{
    const Token = req.headers.authorization;
        if(Token){
            const token = Token.split(' ')[1];
            jwt.verify(token, process.env.JWT_KEY,(err,data)=>{
                if(err){
                    res.status(401).send({message:'Invalid Token'})
                }else{
                    req.user =data;
                    next()
                }
            });
        }else{
            res.status(401).send({
                message:"Please Signup or Signin"
            })
        }
    }