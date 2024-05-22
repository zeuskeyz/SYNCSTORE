const session = require('express-session')
const { userModel } = require("../database_files/models");
const bcrypt = require('bcrypt')

//LANDING PAGE
const landingPage = async (req, res) => {
    res.send('Welcome Home!')
}

//CREATES A USER
const createUser = async (req, res) => {
    try {
        //CHECK IF USER EXISTS
        const exists = await userModel.find({ $or: [{ username: req.body.username }, { email: req.body.email }] })

        if (!exists.length) {

            const hashedPass = await bcrypt.hash(req.body.password, 13) //HASH PASSWORD
            const newUser = new userModel({ ...req.body, password: hashedPass })//CREATE A NEW USER INCLUDING THE HASHED PASSWORD
            await newUser.save(); //SAVE USER TO DATABASE
            res.send(`created user : ${newUser._id}`) //RESPONSE IF USER IS CREATED

        } else res.send('please choose another username/email') //RESPONSE IF USER DETAILS ALREADY EXISTS

    } catch (error) { res.send(error.message) } //FEEDBACK IF USER CREATION PROCESS FAILS TO START
}

//READS USERMODEL TO ALLOW LOGIN
const signIn = async (req, res) => {
    try {

        const exists = await userModel.findOne({ username: req.body.username }) //CHECKS IF USER EXISTS IN DB

        if (exists) {

            const loginAuth = await bcrypt.compare(req.body.password, exists.password) //VALIDATES USER PASSWORD

            if (loginAuth) {

                delete exists._doc.password; delete exists._doc.createdAt; delete exists._doc.updatedAt; //REMOVES THE PASSWORD FROM USER OBJECT
                req.session.user = { ...exists._doc, validated: true } //MODIFIES THE SESSION OBJECT
                res.send(req.session)

            } else res.send('invalid password') //FEEDBACK IF PASSWORD IS INVALID

        } else { res.send('invalid username/email') } //FRESPONSE IF USERNAME IS INVALID

    } catch (error) { res.send(error.message) } //FEEDBACK IF USER LOGIN PROCESS FAILS TO START
}


const logOut = (req, res) => {
    try {

        req.session.destroy()
        res.send('logout successfull')
        
    } catch (error) { res.send(error.message)}
}

module.exports = { createUser, landingPage, signIn, logOut }