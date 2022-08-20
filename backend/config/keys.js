import dotenv from 'dotenv'
dotenv.config()
const keys = {
    type: process.env.TYPE,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY,
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: process.env.AUTH_URL,
    token_uri: process.env.TOKEN_URL,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_URL,
    client_x509_cert_url:process.env.CLIENT_URL,
    LanguageCode: process.env.LC,
    ATLAS_URL:process.env.ATLAS_URL,
}
export default keys