const { response } = require("express");
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
        const exists = await userModel.find({$or: [{username: req.body.username}, {email: req.body.email}]})

        if (!exists.length) {

            const hashedPass = await bcrypt.hash(req.body.password, 13) //HASH PASSWORD
            const newUser = new userModel({ ...req.body, password: hashedPass })//CREATE A NEW USER INCLUDING THE HASHED PASSWORD
            await newUser.save(); //SAVE USER TO DATABASE
            res.send({ reply: 'user created successfully' })

        } else res.send({ reply: 'please choose another username/email' })

    } catch (error) { res.send({ reply: error['message'] }) }
}


//READS USERMODEL TO ALLOW LOGIN
const signIn = (req,res) => {
    
}


module.exports = { createUser, landingPage }