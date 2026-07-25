import express from "express"
import { placeOrder, verifyOrder } from "../controllers/orderController.js"
import authMiddleware from "../middleware/auth.js" // If you use user authentication tokens

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", authMiddleware, verifyOrder); // Add this new route

export default orderRouter;
