import adminEmailModel from '../models/adminEmailModel.js'
import validator from 'validator'

const listAdminEmails = async (req, res) => {
  try {
    const admins = await adminEmailModel.find({}, { email: 1, createdAt: 1, createdBy: 1 })
    return res.status(200).json({ success: true, data: admins })
  } catch (error) {
    console.error('listAdminEmails error:', error)
    return res.status(500).json({ success: false, message: 'Unable to fetch admin emails' })
  }
}

const addAdminEmail = async (req, res) => {
  const { email } = req.body

  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({ success: false, message: 'A valid email is required' })
  }

  try {
    const normalizedEmail = email.toLowerCase().trim()
    const existing = await adminEmailModel.findOne({ email: normalizedEmail })
    if (existing) {
      return res.status(409).json({ success: false, message: 'Email is already registered as admin' })
    }

    const adminEmail = new adminEmailModel({
      email: normalizedEmail,
      createdBy: req.userId || 'system'
    })
    await adminEmail.save()
    return res.status(201).json({ success: true, message: 'Admin email added' })
  } catch (error) {
    console.error('addAdminEmail error:', error)
    return res.status(500).json({ success: false, message: 'Unable to add admin email' })
  }
}

const verifyAdmin = async (req, res) => {
  return res.status(200).json({ success: true, email: req.userEmail || null })
}

export { listAdminEmails, addAdminEmail, verifyAdmin }
