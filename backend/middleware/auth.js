import jwt from "jsonwebtoken"

const authMiddleware = async (req, res, next) => {
    const token = req.headers.token || req.headers.authorization?.split(" ")[1]

    if (!token) {
        return res.status(401).json({ success: false, message: "Not Authorized Login again" })
    }

    try {
        req.body = req.body || {}
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = token_decode.id || token_decode.userId
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({ success: false, message: "Authentication failed" })
    }
}

export default authMiddleware