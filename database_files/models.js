const {model, Schema} = require('mongoose')
const { user } = require('./schemas')
const timeStamp = {timestamps: true}

const userSchema = new Schema(user, timeStamp)

const userModel = model('User', userSchema);

module.exports = {userModel}
