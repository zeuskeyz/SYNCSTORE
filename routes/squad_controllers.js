const { squadModel, userModel } = require("../database_files/models")

//CREATES A SQUAD
const createSquad = async (req, res) => {
    try {
        if (req.session.user && req.session.user.type === 'admin') {

            const check = await squadModel.find({$and:[{ name: req.body.name }, { shop: req.body.shop }]}) // CHECKS IF A SIMILAR SQUAD EXISTS IN DB

            if (!check.length) {

                const newSquad = new squadModel(req.body)
                await newSquad.save()
                res.send(`created squad : ${newSquad.name}`)

            } else res.send('squad already exists')

        } else res.send('login error')

    } catch (error) { res.send(error.message) }
}

//RENDERS ALL SQUADS
const allSquads = async (req, res) => {
    try {
        if (req.session.user) {

            const squadsList = await squadModel.find({ shop: req.session.user.shop })
            res.send(squadsList)

        } else res.send('not logged in')

    } catch (error) { res.send(error.message) }
}

//DELETES A SQUAD
const deleteSquad = async (req, res) => {
    try {
        if (req.session.user) {
            
            const deletedSquad = await squadModel.findById({ _id: req.params.id })

            if (deletedSquad.shop === req.session.user.shop) {

                const squadUsers = await userModel.find({ squads: { $in: [deletedSquad.name] } })

                await squadUsers.forEach(user => {
                    user.squads?.splice((user.squads?.indexOf(deletedSquad.name), 1))
                    user.save()
                })

                await squadModel.findByIdAndDelete({ _id: req.params.id })

            }

        } else res.send('not logged in')

    } catch (error) { res.send(error.message) }
}

module.exports = { createSquad, allSquads, deleteSquad }