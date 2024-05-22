//USER SCHEMA
const user = {

    username: { type: String, required: true, lowercase: true, unique: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    shop: { type: String, required: true, lowercase: true },
    type: { type: String, required: true, lowercase: true },
    password: { type: String, required: true }, 

} 

//TASKS SCHEMA
const task = {

    name: { type: String, required: true, lowercase: true },
    summary: { type: String, required: true, lowercase: true },
    status: { type: String, required: true, lowercase: true, default: 'open'},
    shop: { type: String, required: true, lowercase: true },
    creator: { type: String, required: true, lowercase: true },
    handler: { type: String, default: '', lowercase: true },

}

module.exports = { user, task }