require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const mainRouter = require('./src/routes/main.route');
const registerRouter = require('./src/routes/register.route');
const loginRouter=require('./src/routes/login.route');
const profileRouter=require('./src/routes/profile.route');
const handlebars = require('express-handlebars');
var cookieParser = require('cookie-parser')

const path = require('path');
const port = process.env.PORT || 8080;
const host = process.env.HOST || '127.0.0.1';
const mongoUrl=process.env.MONGO_URL;
// try {
//     mongoose.connect(mongoUrl,()=>{
//         console.log('Successfully connected to mongodb instance');
//     });
    
// } catch (error) {
//     console.log('Unable to connect to mongodb instance', error);
// }

(async () => {
    try{    
        await mongoose.connect(mongoUrl);
        console.log('Connected to the database!');
    }
    catch(e){
        console.log(e.message);
    }
})()


const app=express();
app.use(cookieParser())
app.locals.logged=false;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('public'));

// ejs 
app.engine('hbs',handlebars.engine({
    extname:'hbs',
    layoutsDir:`${__dirname}/src/views/layouts`,
    defaultLayout:'index',
    // helpers:{
    //     test:(a, b, options)=>{
    //         if(a === b){
    //             return options.fn(this);
    //         }
    //         return options.inverse(this);
    //     }
    // }
}));
app.set('view engine','hbs');
app.set('views',path.join(__dirname, 'src/views'));

require('./src/middlewares/isConnected')(app)
app.use('/',registerRouter);
app.use('/', loginRouter);
app.use('/',mainRouter);
app.use('/', profileRouter);
// app.locals.current="111111111111111";

app.get('/',(req,res)=>{
   res.json({message:'404 Not found'});
});

app.listen(port,()=>{
    console.log(`Server listening on ${host}:${port}`);
})
