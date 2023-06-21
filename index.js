import express from "express";
const app = express();
import productRouter from "./src/modules/product/product.router.js";
import userRouter from "./src/modules/user/user.router.js";
import { connectDB } from "./db/connect.js";

connectDB();

app.use(express.json());

app.use("/product", productRouter);
app.use("/user", userRouter);



// Server Listening
const port = 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}...`);
});


