import express from "express"
import { addFood, listFood, removeFood } from "../controllers/foodController.js"
import multer from "multer"
import authMiddleware from "../middleware/auth.js"
import adminMiddleware from "../middleware/admin.js"

const foodRouter = express.Router()

// image storage engine
const storage = multer.diskStorage({
    destination: "uploads",
    fileName: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({ storage })

// send data to server
foodRouter.post("/add", authMiddleware, adminMiddleware, upload.single("image"), addFood)
foodRouter.get("/list", listFood)
foodRouter.post("/remove", authMiddleware, adminMiddleware, removeFood)

export default foodRouter;