//USER SCHEMA
const user = {

    username: { type: String, required: true, lowercase: true, unique: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    shop: { type: String, required: true, uppercase: true },
    type: { type: String, required: true, lowercase: true },
    squads: { type: Array, default: ['shop'] },
    password: { type: String, required: true },

}

//TASKS SCHEMA
const task = {
    
    name: { type: String, required: true, lowercase: true },
    summary: { type: String, required: true, lowercase: true },
    status: { type: String, lowercase: true, default: 'open' },
    shop: { type: String, required: true, uppercase: true },
    creator: { type: String, required: true, lowercase: true },
    audience: { type: String, default: '' }, //GROUP
    assignee: { type: String, required: true }, //EVERYONE OR ANYONE
    picklist: { type: Array, default: [] },
    checkout: { type: Array, default: [] },
    comments: { type: Array, default: [] },
 
}

module.exports = { user, task }