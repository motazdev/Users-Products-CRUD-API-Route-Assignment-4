import { Op, Sequelize } from "sequelize";
import Product from "../../../db/models/product.model.js";
import User from "../../../db/models/user.model.js";



export const addProduct = async (req, res, next) => {
    try {
        const result = await Product.create(req.body, { fields: ["pName", "pDescription", "price", "createdBy"] });
        return res.json({ success: true, message: "Product created successfully" });
    } catch (error) {
        if (error.parent.errno == 1452) {
            return res.json({ success: false, message: "User not found" });
        }
        return res.json({ success: false, message: error.parent.sqlMessage });
    }
};


export const deleteProduct = async (req, res, next) => {
    const { id } = req.params;
    const result = await Product.destroy({
        where: {
            id
        }
    });
    if (result == 0) {
        return res.json({ success: false, message: "Product not found" });
    }
    return res.json({ success: true, message: "Product deleted successfully" });
};


export const updateProduct = async (req, res, next) => {
    const { id } = req.params;
    const result = await Product.update(req.body, {
        where: {
            id
        }
    });
    if (result[0] == 0) {
        return res.json({ success: false, message: "Product not found" });
    }
    return res.json({ success: true, message: "Product updated successfully" });
};


export const getAllProducts = async (req, res, next) => {
    const result = await Product.findAll({ attributes: ["pName", "pDescription", "price"] });
    if (result.length) {
        return res.json({ success: true, result });
    }
    return res.json({ success: false, message: "No Products Found" });
};


export const prodsGreaterThan = async (req, res, next) => {
    const result = await Product.findAll({
        where: {
            price: {
                [Op.gt]: 3000
            }
        }
    });
    if (result.length) {
        return res.json({ success: true, result });
    }
    return res.json({ success: false, message: "No Products Found" });
};


export const prodsWithOwners = async (req, res, next) => {
    const result = await User.findAll({
        include: Product,
        attributes: ["id", "name"]
    });
    return res.json({ success: true, result });

};


export const prodsAverage = async (req, res, next) => {
    const sum = await Product.sum("price");
    const count = await Product.count();
    const average = sum / count;
    return res.json({ success: true, message: `Average of all Products Price is ${average}` });
};