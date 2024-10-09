const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    name: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    avatar: {type: String},
    post: {type: Number, default:0},
})
 module.exports = model('User', userSchema)