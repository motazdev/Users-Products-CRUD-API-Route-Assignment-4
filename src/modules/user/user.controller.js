import { Op } from "sequelize";
import User from "../../../db/models/user.model.js";
import sequelize from "../../../db/connect.js";

export const createUser = async (req, res, next) => {

    try {
        const result = await User.create(req.body);
        return res.json({ success: true, message: "User created successfully" });
    } catch (error) {
        return res.json({ success: false, message: error.parent.sqlMessage });
    }
};


export const updateUser = async (req, res, next) => {
    const { id } = req.params;

    const result = await User.update(req.body, {
        where: {
            id
        }
    });
    if (result[0] == 0) {
        return res.json({ success: false, message: "User not found..." });
    } else {
        return res.json({ success: true, message: "User updated successfully" });
    }
};



export const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    const result = await User.destroy({
        where: {
            id
        }
    });
    if (result == 0) {
        return res.json({ success: false, message: "User not found..." });
    } else {
        return res.json({ success: true, message: "User deleted successfully" });
    }
};


export const getAllUsers = async (req, res, next) => {
    const result = await User.findAll({ attributes: ["name", "email", "age"] });
    return res.json({ success: true, result });
};



export const startWithAandAge = async (req, res, next) => {
    const result = await User.findAll({
        where: {
            age: {
                [Op.lt]: 30
            },
            name: {
                [Op.startsWith]: "a",
            }
        }
    });
    if (result.length) {
        return res.json({ success: true, result });
    }
    return res.json({ success: false, message: "No users found..." });
};


export const ageBetween = async (req, res, next) => {
    const result = await User.findAll({
        where: {
            age: {
                [Op.between]: [20, 30]
            }
        }
    });
    if (result.length) {
        return res.json({ success: true, result });
    }
    return res.json({ success: false, message: "No users found..." });
};


export const oldThreeUsers = async (req, res, next) => {
    const result = await User.findAll({
        order: sequelize.literal('age DESC'),
        limit: 3
    });
    if (result.length) {
        return res.json({ success: true, result });
    }
    return res.json({ success: false, message: "No users found..." });
};


export const searchWList = async (req, res, next) => {
    const { users } = req.body;
    const result = await User.findAll({
        where: {
            id: {
                [Op.in]: users
            }
        }
    });
    if (result.length) {
        return res.json({ success: true, result });
    }
    return res.json({ success: false, message: "No users found..." });

};