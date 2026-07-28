import express from "express"
import cors from "cors"
import {connectDB} from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js'
import "dotenv/config"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import adminRouter from "./routes/adminRoute.js"
import adminEmailModel from "./models/adminEmailModel.js"
import userModel from './models/userModel.js'
import bcrypt from 'bcrypt'

// app config
const app = express()
const port = process.env.PORT || 4000

// middleware

app.disable('x-powered-by')
app.use(express.json({ limit: '10kb' }))
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
)
app.use(express.static('public'))

// Handle favicon request
app.get('/favicon.ico', (req, res) => {
  res.status(204).end()
})

// db connection
const initializeServer = async () => {
  await connectDB()

  const defaultAdmins = (process.env.DEFAULT_ADMIN_EMAILS || 'link4ganpat@gmail.com')
    .split(',')
    .map((email) => email.toLowerCase().trim())
    .filter(Boolean)

  for (const email of defaultAdmins) {
    try {
      await adminEmailModel.updateOne({ email }, { email }, { upsert: true })
      const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'pushpendra@2004'
      const existingUser = await userModel.findOne({ email })
      if (!existingUser) {
        const passwordHash = await bcrypt.hash(defaultPassword, 12)
        await userModel.create({
          name: 'Admin User',
          email,
          password: passwordHash,
          cartData: {}
        })
        console.log(`Created default admin user for ${email}`)
      }
    } catch (error) {
      console.error('Failed to seed admin email or user:', email, error)
    }
  }

  // API endPoints
  app.use("/api/food", foodRouter)
  app.use("/images", express.static('uploads'))
  app.use("/api/user", userRouter)
  app.use("/api/cart", cartRouter)
  app.use("/api/order", orderRouter)
  app.use("/api/admin", adminRouter)

  app.get("/", (req,res)=>{
      res.send("API working")
  })

  app.listen(port, ()=>{
      console.log(`server started on http://localhost:${port}`)
  })
}

initializeServer()

// mongodb+srv://pushpendra:pushpendra2004@cluster01.8xbrnta.mongodb.net/?