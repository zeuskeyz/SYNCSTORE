const session = require('express-session')
const { taskModel } = require("../database_files/models")

//CREATES NEW REQUEST
const createAsk = async (req, res) => {
    try {

        if (req.session.user) {

            const createAsk = new taskModel(req.body)
            await createAsk.save()
            res.send(`successfully created task : ${createAsk._id}`)

        } else { res.send('login first!') }

    } catch (error) { error.message }
}

//RENDERS ALL OPEN REQUESTS
const openAsks = async (req, res) => {
    try {

        if (req.session.user) {

            const asksList = await taskModel.find({
                $and: [
                    { creator: req.session.user.username },
                    { status: 'open' }
                ]
            })

            res.send(asksList)

        } else res.render('login first')

    } catch (error) { res.send(error.message) }
}

//RENDERS ALL OPEN TASKS
const openTasks = async (req, res) => {
    try {

        if (req.session.user) {

            const tasksList = await taskModel.find({
                $and: [
                    { shop: req.session.user.shop },
                    { status: 'open' },
                    { audience: { $in: req.session.user.squads } }]
            })
            res.send(tasksList)

        } else { res.send('login first') }

    } catch (error) { res.send(error.message) }
}

// FACILITATES PICKING A TASK
const pickTask = async (req, res) => {
    try {

        if (req.session.user) {
            const { shop, squads } = req.session.user

            const picked = await taskModel.findById({ _id: req.params.id })

            if (picked.shop === shop && squads.includes(picked.audience) && picked.status === 'open') {

                picked?.picklist.push(req.session.user.username)
                picked.status = 'in progress'
                await picked.save()
                res.send(`task added in your to-do list`)

            } else { res.send('task in wrong shop/audience/status') }

        } else { res.send('login first') }

    } catch (error) { res.send(error.message) }
}

//RENDERS ALL PICKED REQUESTS
const pickedAsks = async (req, res) => {
    try {

        if (req.session.user) {

            const asksList = await taskModel.find({
                $and: [
                    { creator: req.session.user.username },
                    { status: 'in progress' }
                ]
            })
            res.send(asksList)

        } else res.render('login first')

    } catch (error) { res.send(error.message) }
}

//RENDERS ALL PICKED TASKS
const pickedTasks = async (req, res) => {
    try {

        if (req.session.user) {

            const tasksList = await taskModel.find({
                $and: [
                    { shop: req.session.user.shop },//USER ONLY ACCESSESS TASKS UNDER THEIR SHOPS 
                    { status: 'in progress' }, // ONLY TASKS WITH STATUS IN PROGRESS
                    { audience: { $in: req.session.user.squads } } //USER ONLY ACCESS PENDING TASKS IN WHOSE AUDIENCE THEY BELONG
                ]
            })
            res.send(tasksList)

        } else { res.send('login first') }

    } catch (error) { res.send(error.message) }
}

//FACILITATES COMPLETING A TASK
const closeTask = async (req, res) => {
    try {

        if (req.session.user) {

            const { comments } = req.body
            const { username, shop } = req.session.user
            const closed = await taskModel.findById({ _id: req.params.id })

            if (closed.shop === shop && closed.picklist?.includes(username) && closed.status === 'in progress') {

                closed.checkout.push(username)
                closed.comments.push({ [username]: comments })
                closed.status = 'closed'

                await closed.save()
                res.send(`task closed`)

            } else { res.send('task in wrong shop/audience/status') }

        } else { res.send('login first') }

    } catch (error) { res.send(error.message) }

}

//RENDERS ALL CLOSED REQUESTS
const closedAsks = async (req, res) => {
    try {

        if (req.session.user) {

            const asksList = await taskModel.find({
                $and: [
                    { creator: req.session.user.username },
                    { status: 'closed' }
                ]
            })

            res.send(asksList)

        } else res.render('login first')

    } catch (error) { res.send(error.message) }
}

//RENDERS ALL CLOSED TASKS
const closedTasks = async (req, res) => {
    try {

        if (req.session.user) {

            const tasksList = await taskModel.find({
                $and: [
                    { shop: req.session.user.shop }, //USER ONLY ACCESSESS TASKS UNDER THEIR SHOPS 
                    { status: 'closed' }, // ONLY TASKES WITH STATUS CLOSED
                    { checkout: { $in: [req.session.user.username] } } //USER ONLY ACCESS CLOSED TASKS THEY HAVE CLOSED
                ]
            })

            res.send(tasksList)
            //issues ensure that the checkout list has to have the userame of ther session user

        } else { res.send('login first') }

    } catch (error) { res.send(error.message) }
}

module.exports = { createAsk, openAsks, openTasks, pickTask, pickedAsks, pickedTasks, closeTask, closedAsks, closedTasks }







