import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors'
import routerFactory from './routes/index.js'
import path from 'path'

dotenv.config() /* must to be read before mongoose connection! */

mongoose.connect(process.env.MONGO_URI)
const db= mongoose.connection
db.on('error', err => console.log(err))
db.once('open', () =>console.log('MongoDB is connected'))

//express app
const app = express();
app.use(express.json());
app.use(cors()) //let cors approve
app.use(express.static(path.dirname('../frontend/dist')))

//middleware log out the path and method of the request from user
app.use((req,res,next)=>{
    console.log(req.path, req.method)
    next()
})

//routes
routerFactory(app);


//listen for request on port
app.listen(process.env.PORT, ()=>{
    console.log('We Are Connected express')
})