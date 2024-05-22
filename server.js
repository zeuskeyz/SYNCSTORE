const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./database_files/connection');
const sessionData = require('./session');
const routing = require('./routes/paths');

const app = express();

app.use(sessionData)
app.use(express.json())

app.use('/syncstore', routing)

app.listen(process.env.PORT,  () => {
    connectDB()
    console.log('SERVER STARTED')
})

