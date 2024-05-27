
import express from 'express'
import { createUser ,genPassword, getUsername } from '../helper.js';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const router = express.Router()

router.post('/register', async (req, res) => {
    const {username, password}= req.body
    const isUserExits = await getUsername(username)
    if(isUserExits){
        res.status(200).send({message: "User already register please try with new address"})
        return
    }
    const hashedPassword = await genPassword(password)
    const result = await createUser(username, hashedPassword)
    res.send(result)
       
});

router.post('/login', async (req, res) => {
    const {username, password}= req.body
    const userFromDB = await getUsername(username)
    if(!userFromDB){
        res.status(400).send({message: "Invaild Credential"})
        return
    }
    const storedPassword = userFromDB.password;
    const isPasswordMatch = await bcrypt.compare(password , storedPassword)
    if(!isPasswordMatch){
        res.status(400).send({message: "Invaild Credential"})
        return
    }

    // Generate token 
    const token = jwt.sign({id: userFromDB._id}, process.env.SECRET_KEY)
    res.send({message: "Sucessfully login", token: token})
});


export const userRouter = router