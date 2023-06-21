import { DataTypes } from "sequelize";
import sequelize from "../connect.js";

const Product = sequelize.define("product", {
    pName: {
        type: DataTypes.STRING,
        unique: true,
    },
    pDescription: DataTypes.TEXT,
    price: DataTypes.DOUBLE,
});

export default Product;