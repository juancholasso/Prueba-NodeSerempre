var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const paginate = require('express-paginate');

var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');
var citiesRouter = require('./src/routes/cities');
var clientsRouter = require('./src/routes/clients');

var app = express();

var sequelize = require('./src/config/Database');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(paginate.middleware(5, 10));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cities', citiesRouter);
app.use('/clients', clientsRouter);

run();

async function run() {
    try {
        await sequelize.authenticate();
        app.listen(8000, 'localhost', () => {
            console.log(`Example app listening at http://localhost:8000`)
        });
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}