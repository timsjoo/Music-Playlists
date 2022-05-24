require('dotenv').config();

const express = require('express');
const cors = require('cors')
const app = express();
const cookieParser = require('cookie-parser');


app.use(cookieParser());
app.use(cors({origin: 'http://localhost:3000', credentials:true }));
app.use(express.json());   
app.use(express.urlencoded({ extended: true }));

require('./config/mongoose.config'); 
require('./routes/user.route')(app);
require('./routes/playlist.route')(app);
require('./routes/spotify.route')(app);


const port = process.env.SERVER_PORT;
app.listen(port, () => console.log(`Listening on port: ${port}`) );
