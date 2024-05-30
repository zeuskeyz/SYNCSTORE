const session = require('express-session')
const session_store = require('connect-mongodb-session')(session);

const timeOut = 1000*60*5;

const storage = new session_store(
  {
    uri: process.env.DB_URI,
    collection: 'sessions',
    expires: timeOut
  }
)

const sessionData = session({
    key:'syncstore',
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized: false,
    store: storage, 
    cookie:{
        expires: timeOut
    }
})

module.exports = sessionData;