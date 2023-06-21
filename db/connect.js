import { Sequelize } from "sequelize";

const sequelize = new Sequelize('2006route', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export const connectDB = async () => {
    return await sequelize.sync().then(() => {
        console.log("DB connected successfully");
    });
};


export default sequelize;