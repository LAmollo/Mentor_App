import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  contact: { type: String },
  location: { type: String },
  profileUrl: { type: String },
  about: { type: String },
  jobPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
});

companySchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
});

companySchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

companySchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

export default mongoose.model('Company', companySchema);
