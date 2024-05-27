// const express = require('express')
// const { MongoClient } = require('mongodb')

import express from 'express'
import { MongoClient } from 'mongodb'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { productRouter } from './routes/product.js';
import { userRouter } from './routes/user.js'
dotenv.config()

const app = express();
const PORT = 5000

app.use(express.json());
app.use(cors())


const MONGO_URL = process.env.MONGO_URL
// "mongodb://localhost:27017"


async function createConnection(){
    const client = new MongoClient(MONGO_URL);
    await client.connect()
    console.log("Hi sudarsan mongodb is connected")
    return client
}

export const client = await createConnection()

app.get('/',(req,res)=>{
    res.send("HI Sudarsan")
})

app.use('/product',productRouter)

app.use('/users', userRouter)

app.listen(PORT, ()=>console.log(`Server has started ${PORT}`))



