import dotenv from "dotenv";
dotenv.config({
    path: "./.env"
})
import express from "express";
import cors from "cors";
import mongooseConnect from "./db/index.js";
const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb" }));
app.use(express.static("public"));
const PORT = process.env.PORT;
mongooseConnect().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running on PORT ${PORT}`);
    })
}).catch((err) => {
    console.log("Error connecting with mongoDB");
})
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type"],
}))


import healthRoutes from "./routes/healthcheck.routes.js";

app.use("/api/v1/healthcheck", healthRoutes);
app.get('/', (req, res) => {
    res.send("hi welcome to the app");
})
