const session = require('express-session')
const session_store = require('connect-mongodb-session')(session);

const store = new session_store(
  {
    uri: process.env.DB_URI,
    collection: 'auth_store'
  }
)

const sessionData = session({
    secret : process.env.SECRET,
    saveUninitialized: false,
    resave: false,
    cookie:{},
    store: store
})

module.exports = sessionData;