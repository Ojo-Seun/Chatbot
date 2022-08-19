import dotenv from 'dotenv'
dotenv.config()
const keys =  {
    googleProjectId: process.env.PROJECT_ID,
    googlePrivateKeyId: process.env.PRIVATE_KEY_ID,
    googlePrivateKey: process.env.PRIVATE_KEY,
    googleClientEmail:process.env.CLIENT_EMAIL,
    LanguageCode: process.env.LC,
    MONGODB_LOCAL_URL:process.env.MONGODB_LOCAL_URL,
}
export default keys