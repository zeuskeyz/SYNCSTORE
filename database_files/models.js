const { model, Schema } = require('mongoose')
const { user, task, squad } = require('./schemas')

const timeStamp = { timestamps: true }

const userModel = model('User', new Schema(user, timeStamp))
const taskModel = model("Task", new Schema(task, timeStamp))
const squadModel = model("Squad", new Schema(squad, timeStamp))

module.exports = { userModel, taskModel, squadModel}
