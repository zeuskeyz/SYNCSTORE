const {model, Schema} = require('mongoose')
const { user } = require('./schemas')
const timeStamp = {timestamps: true}

const userModel = model('User', new Schema(user, timeStamp));

module.exports = {userModel}
