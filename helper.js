import { client } from './index.js';
import bcrypt from "bcrypt"

async function getproductbyquery(sud) {
    return await client.db("MongoDBpractice").collection("products").find(sud).toArray();
}
 async function getproductbyID(id) {
    return await client.db("MongoDBpractice").collection("products").findOne({ id: id });
}
 async function addproduct(newproduct) {
    return await client.db("MongoDBpractice").collection("products").insertMany(newproduct);
}
 async function deleteproductbyID(id) {
    return await client.db("MongoDBpractice").collection("products").deleteOne({ id: id });
}

async function updateProductbyID(id, updateProduct) {
    return await client.db("MongoDBpractice").collection("products").updateOne({ id: id },{$set: updateProduct});
}

async function genPassword(password){
    const salt = await bcrypt.genSalt(10)
    console.log(salt)
    const hashedPassword = await bcrypt.hash(password , salt)
    console.log(hashedPassword)
    return hashedPassword
}

async function createUser(username, hashedPassword) {
    return await client.db("MongoDBpractice").collection("users").insertOne({ username: username, password: hashedPassword });
}

async function getUsername(username) {
    return await client.db("MongoDBpractice").collection("users").findOne({ username: username});
}

export {getproductbyquery, getproductbyID, addproduct, deleteproductbyID, updateProductbyID, genPassword, createUser, getUsername }