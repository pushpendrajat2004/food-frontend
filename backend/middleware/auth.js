import jwt from "jsonwebtoken"

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1] || req.headers.token

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized. Please login again.' })
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = tokenDecode.id || tokenDecode.userId
        req.userEmail = tokenDecode.email || tokenDecode.userEmail
        next()
    } catch (error) {
        console.error(error)
        return res.status(401).json({ success: false, message: 'Authentication failed' })
    }
}

export default authMiddleware