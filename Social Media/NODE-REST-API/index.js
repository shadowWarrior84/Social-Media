const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const cors = require("cors");
const multer = require("multer");
const path = require("path")

dotenv.config();
const app = express();

mongoose.connect("mongodb://localhost:27017/Social", ()=>{
    console.log("Connected to MONGODB");
});

app.use("/images", express.static(path.join(__dirname, "public/images")))

app.use(cors());

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "public/images");
    },
    filename: (req, file, cb)=>{
        // cb(null, file.name);
        // const filename = req.body.name
        // const filename = Date.now() + file.originalname
        cb(null, req.body.name);
        // cb(null, file.originalname);
    },
})

const upload = multer({storage});
app.post("/api/upload", upload.single("file"), (req, res)=>{
    try {
        return res.status(200).json("File uploaded successfully");
    } catch (err) {
        console.log(err);
    }
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(8800,()=>{
    console.log("Backend server is running!");
})