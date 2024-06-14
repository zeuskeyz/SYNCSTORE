const session = require('express-session')
const bcrypt = require('bcrypt')
const { userModel, squadModel } = require("../database_files/models");

//LANDING PAGE
const landingPage = async (req, res) => {
    try {
        if (req.session.user) {
            const { username, role, shop, valid, squads} = req.session.user
            res.send(req.session.user)

        } else (res.send({ valid: false }))
    } catch (error) { res.send(error.message) }
}

//CREATES A USER
const createUser = async (req, res) => {
    try {
        //CHECK IF PASSWORDS MATCH
        if (req.body.password === req.body.repeat) {
            //CHECK IF USER EXISTS
            const exists = await userModel.find({ $or: [{ username: req.body.username }, { email: req.body.email }] })

            if (!exists.length) {

                const hashedPass = await bcrypt.hash(req.body.password, 13) //HASH PASSWORD
                const newUser = new userModel({ ...req.body, password: hashedPass })//CREATE A NEW USER INCLUDING THE HASHED PASSWORD
                await newUser.save(); //SAVE USER TO DATABASE
                res.send({ note: `created user successfully` }) //RESPONSE IF USER IS CREATED

            } else res.send({ note: 'please choose another username/email' }) //RESPONSE IF USER DETAILS ALREADY EXISTS

        } else { res.send({ note: 'passwords are different' }) }

    } catch (error) { res.send({ note: error.message }) } //FEEDBACK IF USER CREATION PROCESS FAILS TO START
}

//READS USERMODEL TO ALLOW LOGIN
const signIn = async (req, res) => {
    try {
        const exists = await userModel.findOne({ username: req.body.username }) //CHECKS IF USER EXISTS IN DB
        if (exists) {

            const loginAuth = await bcrypt.compare(req.body.password, exists.password) //VALIDATES USER PASSWORD

            if (loginAuth) {

                const { username, email, shop, role, squads } = exists
                req.session.user = { username, email, shop, role }; req.session.valid = true; //MODIFIES THE SESSION OBJECT
                res.send({ authUser: req.session.user, valid: req.session.valid, note: `Welcome back ${req.body.username}` })

            } else res.send({ note: 'invalid password' }) //FEEDBACK IF PASSWORD IS INVALID

        } else { res.send({ note: 'invalid username/email' }) } //FRESPONSE IF USERNAME IS INVALID

    } catch (error) { res.send({ note: error }); console.log(error) } //FEEDBACK IF USER LOGIN PROCESS FAILS TO START
}

// GETS ALL THE SQUADS A USER DOESNT BELONG TO 
const potentialSquads = async (req, res) => {
    try {
        if (req.session.user) {

            if (req.session.user.role === 'admin') {

                const member = await userModel.findById({ _id: req.params.id })
                const allSquads = await squadModel.find()

                if (member?.shop === req.session.user.shop) {

                    const missingSquads = []
                    await allSquads.forEach(squad => !member.squads.includes(squad.name) && missingSquads.push(squad))
                    res.send(missingSquads)

                } else { res.send("user from different shop") }

            } else { res.send('login as admin first') }

        } else { res.send('session expired: login again') }

    } catch (error) { res.send(error.message) }
}


// ADDS A SQUAD TO USER 
const groupAdd = async (req, res) => {
    try {
        if (req.session.user) {

            if (req.session.user.role === 'admin') {

                const member = await userModel.findById({ _id: req.params.id })

                if (member?.shop === req.session.user.shop) {

                    !member.squads?.includes(req.body.squad) && member.squads?.push(req.body.squad)
                    await member.save()
                    res.send(`${member.username} added to ${req.body.squad} squad`)

                } else { res.send("user from different shop") }

            } else { res.send('login as admin first') }

        } else { res.send('session expired: login again') }

    } catch (error) { res.send(error.message) }
}


// REMOVES A SQUAD FROM USER 
const groupRemove = async (req, res) => {
    try {
        if (req.session.user) {

            if (req.session.user.role === 'admin') {

                const member = await userModel.findById({ _id: req.params.id })
                if (member?.shop === req.session.user.shop) {
                    let delt = req.body.name
                    member.squads?.splice((member.squads?.indexOf(req.body.squad)), 1)
                    await member.save()
                    res.send(`${member.username} removed from ${delt} squad`)

                } else { res.send('user from different shop') }

            } else { res.send('login as admin first') }
        } else { res.send('session expired: login again') }

    } catch (error) { res.send(error.message) }
}


//USER EDITTING
const getEdit = async (req, res) => {
    try {

        if (req.session.user && req.session.user.role === 'admin') {

            const editable = await userModel.findOne({ $and: [{ _id: req.params.id }, { shop: req.session.user.shop }] })
            const { username, email, shop, role } = editable
            res.send({ username, email, shop, role })

        } else { res.send({ valid: false }) }

    } catch (error) { res.send(error.message) }
}


//RENDERS ALL USERS
const allUsers = async (req, res) => {

    try {
        if (req.session.user && req.session.user.role === 'admin') {

            const users = await userModel.find()
            res.send(users)

        } else res.send({ valid: false })

    } catch (error) { res.send(error.message) }
}


//RETURNS USER TO BE DELETED
const getAUser = async (req, res) => {
    try {
        if (req.session.user) {

            const managedUser = await userModel.findById({ _id: req.params.id })

            if (managedUser.shop === req.session.user.shop) {

                const { username, email, role, shop, squads } = managedUser
                res.send({ username, role, shop, email, squads})
                
            }

        } else res.send('not logged in')

    } catch (error) { res.send(error.message) }
}


//DELETES A USER
const deleted = async (req, res) => {

    if (req.session.user) {
        const deleted = await userModel.findByIdAndDelete({ _id: req.params.id })
        console.log(deleted)
        res.send(`user deleted successfully`)
    } else { res.send('log in') }

}

//FACILITATES USER LOGOUT
const logOut = async (req, res) => {
    try {

        await req.session.destroy() //DESTROYS THE USER SESSION
        res.send('logout successfull')

    } catch (error) { res.send(error.message) }
}

//MAKES ALL FUNCTIONS IN THIS FILE ACCESSIBLE FROM WITHOUT
module.exports = { 
    createUser, 
    landingPage, 
    signIn, 
    logOut,
    potentialSquads, 
    groupAdd, 
    groupRemove, 
    allUsers, 
    getEdit, 
    getAUser, 
    deleted,
}