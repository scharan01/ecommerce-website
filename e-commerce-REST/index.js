const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/products");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/orders");
const cors = require("cors");


dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(() =>
console.log("connection sucessful"))
.catch(() =>
console.log("error"));

const app = express();

app.use(cors({
    origin : "http://localhost:3000"
}));

app.use(express.json());

app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/products",productRoute);
app.use("/api/cart",cartRoute);
app.use("/api/orders",orderRoute);

app.listen(5000,()=>{
    console.log("server running");
});