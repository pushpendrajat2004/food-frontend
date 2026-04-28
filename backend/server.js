import express from "express"
import cors from "cors"
import {connectDB} from './config/db.js'
import foodRouter from './routes/foodRoute.js'


// app config
const app = express()
const port = 4000

// middleware

app.use(express.json())
app.use(cors())
app.use(express.static("public"))
app.use("/images", express.static('uploads'))

// Handle favicon request
app.get("/favicon.ico", (req, res) => {
    res.status(204).end()
})

// db connection
connectDB();

// API endPoints
app.use("/api/food", foodRouter)

app.get("/", (req,res)=>{
    res.send("API working")
})


app.listen(port, ()=>{
    console.log(`server started on http://localhost:${port}`)
})

// mongodb+srv://pushpendra:pushpendra2004@cluster01.8xbrnta.mongodb.net/?