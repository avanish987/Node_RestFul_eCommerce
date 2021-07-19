const express = require("express");
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./apinodeshop/routes/products');
const orderRoutes = require('./apinodeshop/routes/orders');
const userRoutes = require('./apinodeshop/routes/user');


mongoose.connect('mongodb+srv://avanish987:'
    +process.env.MONGO_PW + 
    '@cluster0.ar6sr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' +
    {
        useMongoClient: true
    }
);

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methos',
        'PUT, POST, PATCH, DELETE,GET');
        return res.status(200).json({});
    }
    next();
});

// Routes jo handle krega requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);


app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message:error.message
        }
    });
});
module.exports = app;