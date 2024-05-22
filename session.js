const session = require('express-session')
const session_store = require('connect-mongodb-session')(session);

const timeOut = 1000*60

const store = new session_store(
  {
    uri: process.env.DB_URI,
    collection: 'sessions',
    expires: timeOut
  }
)

const sessionData = session({
    secret : process.env.SECRET,
    saveUninitialized: false,
    resave: false,
    cookie:{ maxAge: timeOut},
    store: store
})

module.exports = sessionData;