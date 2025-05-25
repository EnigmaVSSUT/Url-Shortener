import express from "express"
import dotenv from "dotenv"
import connectDB from "./src/config/mongo.config.js"
import shortUrl from "./src/routes/shortUrl.routes.js"
import { redirectFromShortUrl } from "./src/controller/shortUrl.controller.js"
import { errorHandler } from "./src/utils/errorHandler.js"
import cors from "cors" // aloow cross server access in the network
import authRoutes from "./src/routes/auth.routes.js"

dotenv.config("./.env")

const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.send("getting request")
})

// create shorturl

app.use("/api/create",shortUrl)
app.use("/api/auth",authRoutes)

// redirection

app.get("/:shorturl",redirectFromShortUrl)

app.use(errorHandler)

app.listen(5000,()=>{
    connectDB()
    console.log("listening to port 5000",);
})