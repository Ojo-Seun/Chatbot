import mongoose from 'mongoose'
const Schema = mongoose.Schema


const AdminSchema = new Schema({
    name: {type: String, require: [true, 'Provide a NAME'],},

    email: {type: String, require: true, unique:true},

    password: {type: String, require: true,},
    isAdmin: {type: Boolean, require: true, default:true},

    createdOn: {type:Date}

})

const AdminUser = mongoose.model('AdminUser', AdminSchema)
export default AdminUser