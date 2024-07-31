import Product from "../models/Product.js"

const createProduct = async (req, res) => {
    const {name, price , description, type , size, material , images} = req.body 

    await Product.create({
        name,
        price,
        description,
        type,
        size,
        material,
        images
    })

    return res.status(201).send("Add Product Successfully")
}

const getProduct = async (req, res) => {
    const products = await Product.find()
    return res.send(products)
}

export {
    createProduct,
    getProduct
}

