const express=require('express')
const { default: mongoose } = require('mongoose')
const cors = require('cors');
require('dotenv').config();
const productrouter = require('./routes/productroutes');
const userRouter = require('./routes/userroutes');
const app=express()
app.use(express.json())
app.use(cors());
app.use('/user',userRouter)
app.use('/product',productrouter)
const uri=process.env.MONGO_URI
const port=process.env.port
console.log(uri)
console.log(port)
const connectdb=()=>{
    try{
    mongoose.connect(uri)
    console.log('database is connected')
    }
    catch(err){
        console.log(err)
    }
    
}

app.listen(port,()=>{
    connectdb()
    console.log('server is started')
})