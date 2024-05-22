const session = require('express-session')
const { taskModel } = require("../database_files/models")

//CREATES NEW TASK
const newTask = async (req, res) => {
    try {

        if (req.session) {
            const newTask = new taskModel(req.body)
            await newTask.save()
            res.send(`successfully created task : ${newTask._id}`)
        }

    } catch (error) { error.message }
}

//RENDERS ALL OPEN TASKS
const openTasks = async (req, res) => {
    try {

        if (req.session) {
            const tasksList = await taskModel.find({ $and: [{ shop: req.session.user.shop }, { status: 'open' }] })
            res.send(tasksList)
        }

    } catch (error) { res.send(error.message) }
}

//RENDERS ALL TASKS IN PROGRESS
const pickedTasks = async (req, res) => {
    try {

        if (req.session) {
            const tasksList = await taskModel.find({ $and: [{ shop: req.session.user.shop }, { status: 'in progress' }] })
            res.send(tasksList)
        }

    } catch (error) { res.send(error.message) }
}

//RENDERS ALL COMPLETED TASKS
const closedTasks = async (req, res) => {
    try {

        if (req.session) {
            const tasksList = await taskModel.find({ $and: [{ shop: req.session.user.shop }, { status: 'closed' }] })
            res.send(tasksList)
        }

    } catch (error) { res.send(error.message) }
}

module.exports = {newTask, openTasks, pickedTasks, closedTasks }







