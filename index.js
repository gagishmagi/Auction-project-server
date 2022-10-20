const express = require("express")
const  mongoose  = require("mongoose")
const app = express()
const port = 5000
const routesOne = require('./routes/usersroute')
const routesTwo = require('./routes/itemroute')
const bodyParser = require("body-parser")
const morgan = require("morgan")
require('dotenv').config()
app.use(bodyParser.json());
app.use(morgan("dev"));

mongoose.connect(process.env.DB,{useNewUrlParser:true})
        .then(()=>console.log('conected to DB'))
        .catch((err)=>console.log(err))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,Authorization,token');
    next();
    });
  
app.use('/api',routesOne)
app.use('/api1',routesTwo)


app.use((err, req, next) => { 
    console.log(err)
    next();
})
app.listen(port,()=>{
    console.log(`server is runing on port ${port}`);
})


