import { client } from './index.js';

export async function getproductbyquery(sud) {
    return await client.db("MongoDBpractice").collection("products").find(sud).toArray();
}
export async function getproductbyID(id) {
    return await client.db("MongoDBpractice").collection("products").findOne({ id: id });
}
export async function addproduct(newproduct) {
    return await client.db("MongoDBpractice").collection("products").insertMany(newproduct);
}
export async function deleteproductbyID(id) {
    return await client.db("MongoDBpractice").collection("products").deleteOne({ id: id });
}

export async function updateProductbyID(id, updateProduct) {
    return await client.db("MongoDBpractice").collection("products").updateOne({ id: id },{$set: updateProduct});
}
