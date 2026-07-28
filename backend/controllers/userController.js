import userModel from "../models/userModel.js";
import adminEmailModel from "../models/adminEmailModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

// login user
const loginUser = async (req, res) => {
    const { email, password, adminLogin } = req.body

    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).json({ success: false, message: 'User does not exist' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid password' })
        }

        if (adminLogin) {
            const normalizedEmail = email.toLowerCase().trim()
            const isAdmin = await adminEmailModel.exists({ email: normalizedEmail })
            if (!isAdmin) {
                return res.status(403).json({ success: false, message: 'Admin access denied. This account is not registered for admin login.' })
            }
        }

        const token = createToken(user._id, user.email)
        return res.status(200).json({ success: true, token })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: 'Server error while logging in' })
    }
}

const createToken = (id, email) => {
    const payload = { id }
    if (email) payload.email = email
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' })
}

// registerr user
const registerUser = async (req,res) =>{
    const {name,password,email}=req.body;
    try{
        // checking if the user already exists
        const exist = await userModel.findOne({ email })
        if (exist) {
            return res.status(409).json({ success: false, message: 'User already exists' })
        }

        // validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: 'Please enter a valid email' })
        }

        if (password.length < 8) {
            return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' })
        }

        // hashing or encrypting user password
        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        })

        const user = await newUser.save()
        const token = createToken(user._id, user.email)
        res.status(201).json({ success: true, token })

    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: 'Server error while registering user' })
    }
}

export {loginUser, registerUser}