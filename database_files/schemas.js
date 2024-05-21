const user = {
    username: { type: String, required: true, lowercase: true },
    email: { type: String, required: true, lowercase: true },
    password: { type: String, requiredd: true }
}

module.exports = {user}