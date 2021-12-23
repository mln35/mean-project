require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const registerRouter = require('./src/routes/register.route');
const handlebars = require('express-handlebars');
const path = require('path');
const port = process.env.PORT || 8080;
const host = process.env.HOST || '127.0.0.1';
const mongoUrl=process.env.MONGO_URL;

mongoose.Promise = global.Promise;
try {
    mongoose.connect(mongoUrl,()=>{
        console.log('Successfully connected to mongodb instance');
    });
    
} catch (error) {
    console.log('Unable to connect to mongodb instance', error);
}

const app=express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('public'));

// ejs 
app.engine('hbs',handlebars.engine({
    extname:'hbs',
    layoutsDir:`${__dirname}/src/views/layouts`,
    defaultLayout:'index'
}));
app.set('view engine','hbs');
app.set('views',path.join(__dirname, 'src/views'));

// app.use('/',(req, res) => {
//     res.render('pages/register')
// })
app.use('/',registerRouter);

app.get('/',(req,res)=>{
   res.json({message:'404 Not found'});
});

app.listen(port,()=>{
    console.log(`Server listening on ${host}:${port}`);
})
