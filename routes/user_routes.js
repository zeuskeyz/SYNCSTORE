const { userModel } = require("../database_files/models");


//LANDING PAGE
const landingPage = async (req, res) => {
    res.send('Welcome Home!')
}

//CREATES A USER
const createUser = async (req, res) => {
    const newUser = new userModel(req.body)
    await newUser.save();
    res.send(newUser)
}


module.exports ={createUser, landingPage}