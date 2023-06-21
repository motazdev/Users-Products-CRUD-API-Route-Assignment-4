import { DataTypes } from "sequelize";
import sequelize from "../connect.js";
import Product from "./product.model.js";

const User = sequelize.define("user", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: DataTypes.INTEGER

});

User.hasMany(Product, {
    foreignKey: 'createdBy'
});
Product.belongsTo(User, {
    foreignKey: 'createdBy'
});


export default User;