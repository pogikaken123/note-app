const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const app = express();

dotenv.config({path: './config/config.env'});

const PORT = process.env.PORT || 3000;
//Route Files
const notes = require('./router/note')
const auth = require('./router/auth')
const connectDB = require('./config/db')
//Connect db
connectDB();

//Body parser
app.use(express.json());
//use cors
app.use(cors());
//Cookie Parser
app.use(cookieParser());


app.use('/api/v1/notes',notes)
app.use('/api/v1/auth',auth)

app.listen(PORT,console.log(`Listening on port ${PORT}`))