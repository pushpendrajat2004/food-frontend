import express from 'express'
import { listAdminEmails, addAdminEmail, verifyAdmin } from '../controllers/adminController.js'
import authMiddleware from '../middleware/auth.js'
import adminMiddleware from '../middleware/admin.js'

const adminRouter = express.Router()

adminRouter.get('/emails', authMiddleware, adminMiddleware, listAdminEmails)
adminRouter.post('/emails', authMiddleware, adminMiddleware, addAdminEmail)
adminRouter.get('/verify', authMiddleware, adminMiddleware, verifyAdmin)

export default adminRouter
