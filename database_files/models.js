const {model, Schema} = require('mongoose')
const { user, task } = require('./schemas')

const timeStamp = {timestamps: true}

const userModel = model('User', new Schema(user, timeStamp));
const taskModel = model("Task", new Schema(task, timeStamp))

module.exports = {userModel, taskModel}
