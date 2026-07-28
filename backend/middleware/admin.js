import adminEmailModel from '../models/adminEmailModel.js'

const adminMiddleware = async (req, res, next) => {
  const email = req.userEmail?.toLowerCase().trim()
  if (!email) {
    return res.status(401).json({ success: false, message: 'Admin access requires authentication' })
  }

  try {
    const isAdmin = await adminEmailModel.exists({ email })
    if (!isAdmin) {
      return res.status(403).json({ success: false, message: 'Admin access denied' })
    }
    next()
  } catch (error) {
    console.error('adminMiddleware error:', error)
    return res.status(500).json({ success: false, message: 'Unable to verify admin privileges' })
  }
}

export default adminMiddleware
