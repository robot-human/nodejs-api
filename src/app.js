const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
const connection = require('./db_connection.js');

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended:false}));
app.use(morgan('dev'));

const homeRoutes = require("./routes/index");
app.use(homeRoutes);

app.listen(app.get('port'), () => {
    console.log(`Server listening to port ${app.get('port')}`);
});