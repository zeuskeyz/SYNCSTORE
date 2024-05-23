const session = require('express-session')
const { taskModel } = require("../database_files/models")

//CREATES NEW TASK --
const newTask = async (req, res) => {
    try {

        if (req.session.user) {

            const newTask = new taskModel(req.body)
            await newTask.save()
            res.send(`successfully created task : ${newTask._id}`)

        } else { res.send('login first!') }

    } catch (error) { error.message }
}

//RENDERS ALL OPEN TASKS --
const openTasks = async (req, res) => {
    try {

        if (req.session.user) {

            console.log(req.session.user.squads)
            const tasksList = await taskModel.find({ $and: [{ shop: req.session.user.shop }, { status: 'open' }, { audience: { $in: req.session.user.squads } }] })
            res.send(tasksList)

        } else { res.send('login first') }

    } catch (error) { res.send(error.message) }
}

// FACILITATES PICKING A TASK
const pickTask = async (req, res) => {
    try {

        if (req.session.user) {

            const picked = await taskModel.findById({ _id: req.params.id })
            picked?.picklist.push(req.session.user.username)
            picked.status = 'in progress'
            await picked.save()
            res.send(`task added in your to-do list`)

        } else { res.send('login first') }

    } catch (error) { res.send(error.message) }
}

//RENDERS ALL TASKS IN PROGRESS
const pickedTasks = async (req, res) => {
    try {

        if (req.session.user) {

            const tasksList = await taskModel.find({ $and: [{ shop: req.session.user.shop }, { status: 'in progress' }, { audience: { $in: req.session.user.squads } }] })
            res.send(tasksList)

        } else { res.send('login first') }

    } catch (error) { res.send(error.message) }
}

//FACILITATES COMPLETING A TASK
const closeTask = async (req, res) => {
    try {

        if (req.session.user) {
            const { comments } = req.body
            const { username } = req.session.user
            const closed = await taskModel.findById({ _id: req.params.id })
            closed?.checkout.push(username)
            closed?.comments.push({ username: comments })
            closed.status = 'closed'
            await closed.save()
            res.send(`task closed`)

            //issues ensure that the picklist has to have the userame of ther session user

        } else { res.send('login first') }

    } catch (error) { res.send(error.message) }

}

//RENDERS ALL closed TASKS
const closedTasks = async (req, res) => {
    try {

        if (req.session.user) {

            const tasksList = await taskModel.find({ $and: [{ shop: req.session.user.shop }, { status: 'closed' }, { audience: { $in: req.session.user.squad } }] })
            res.send(tasksList)
            //issues ensure that the checkout list has to have the userame of ther session user


        } else { res.send('login first') }

    } catch (error) { res.send(error.message) }
}

module.exports = { newTask, openTasks, pickTask, pickedTasks, closeTask, closedTasks }







