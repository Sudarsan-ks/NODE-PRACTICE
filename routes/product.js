import { getproductbyquery, getproductbyID, addproduct, deleteproductbyID, updateProductbyID } from '../helper.js';
import express from 'express'
import {auth} from '../middleware/auth.js'

const router = express.Router()

router.get('/',auth, async (req, res) => {
    const { category, rating } = req.query;
    try {
        let sud = {};
        if (category) {
            sud.category = category;
        }
        if (rating) {
            sud.rating = +rating;
        }

        const filterProduct = await getproductbyquery(sud);

        if (filterProduct.length > 0) {
            res.send(filterProduct);
        }

        else {
            res.status(404).send({ message: "Product not found" });
        }
    }
    catch (error) {
        res.status(500).send({ message: "server error" });
    }
});


router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const Product = await getproductbyID(id);
    res.send(Product);
});


router.post('/', async (req, res) => {
    const newproduct = req.body;
    console.log(newproduct);
    const result = await addproduct(newproduct);
    res.send(result);
});


router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const Product = await deleteproductbyID(id);
    res.send(Product);
});


router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updateProduct = req.body;
    const result = await updateProductbyID(id, updateProduct);
    res.send(result);
})

export const productRouter = router