import mongoose from 'mongoose'

const adminEmailSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: String }
})

const adminEmailModel = mongoose.models.adminEmail || mongoose.model('adminEmail', adminEmailSchema)
export default adminEmailModel
