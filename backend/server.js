const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Social Blog API is running!");
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

async function startServer() {
    await connectDB();

    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
}

startServer();
console.log("JWT_SECRET loaded:", Boolean(process.env.JWT_SECRET));
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YWQ5MGVmZDIxYzRkNTFjMmUwOWFmYjYiLCJpYXQiOjE3OTI2MTEyMDQsImV4cCI6MTc5MjY5NzYwNH0.61SPTR7o-qo8SfzVAVB4IUWyvgIaiq2_DU-xk6FVk_Y