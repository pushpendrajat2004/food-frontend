import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import razorpay from "razorpay"
import crypto from "crypto" // Built-in Node.js module, no installation needed

// FIX: Initialize with an object containing BOTH key_id and key_secret
const razorPayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

// placing user order for frontend
const placeOrder = async (req, res) => {
    try {
        // 1. Create and save the order in your MongoDB database
        const newOrder = new orderModel({
            userId : req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        })
        await newOrder.save()

        // FIX: Fixed variable casing typo (changed req.body.userid to req.body.userId)
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} }) // clear cart after placing order
        
        // 2. Prepare the parameters for Razorpay
        // Note: Razorpay accepts amount in PAISA. (1 INR = 100 Paisa). Multiply your amount by 100.
        const options = {
            amount: req.body.amount * 100, 
            currency: "INR",
            receipt: newOrder._id.toString(), // Connects Razorpay transaction to your MongoDB Order ID
        }

        // 3. Create the Razorpay Order via their official API
        const razorpayOrder = await razorPayInstance.orders.create(options)

        // 4. Send a success response back to your React app
        // Your frontend needs this "razorpayOrder" object to launch the checkout popup window!
        res.status(200).json({
            success: true,
            orderId: newOrder._id,         // Your MongoDB database order ID
            razorpayOrder: razorpayOrder   // The gateway order configuration data
        })

    } catch (error) {
        console.error("Payment Order Creation Failed:", error)
        res.status(500).json({
            success: false,
            message: "Failed to initialize payment gateway order."
        })
    }
}

// verifying order payment details
const verifyOrder = async (req, res) => {
    try {
        const { orderId, razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

        // 1. Combine the Order ID and Payment ID with an underscore as required by Razorpay
        const sign = razorpay_order_id + "|" + razorpay_payment_id;

        // 2. Generate an expected signature using your Secret Key
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        // 3. Compare the signature you calculated with the one given by the frontend modal
        if (expectedSignature === razorpay_signature) {
            
            // Success! Update your MongoDB database to mark the order as paid
            await orderModel.findByIdAndUpdate(orderId, { 
                payment: true,
                paymentId: razorpay_payment_id // Optional: good for tracking refunds later
            });

            res.status(200).json({ 
                success: true, 
                message: "Payment verified and order updated successfully." 
            });
            
        } else {
            // Tampering detected or incomplete payment session
            res.status(400).json({ 
                success: false, 
                message: "Invalid transaction signature. Payment verification failed." 
            });
        }

    } catch (error) {
        console.error("Verification Error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Internal server error during verification." 
        });
    }
}


// user Order for frontend
const userOrders = async (req,res) => {
    try{
        const orders = await orderModel.find({userId: req.body.userId})
        res.json({success: true, data: orders})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}

export { placeOrder, verifyOrder , userOrders }
