import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  jobType: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: String, required: true },
  vacancies: { type: Number, default: 1 },
  experience: { type: String },
  detail: {
    desc: { type: String, required: true },
    requirements: { type: String, required: true },
  },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
}, { timestamps: true });

export default mongoose.model('Job', jobSchema);
