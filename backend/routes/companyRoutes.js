import express from "express";
import {
  registerCompany,
  signInCompany,
  updateCompanyProfile,
  getCompanyProfile,
  getCompanies,
  getCompanyById,
  createJob,
  updateJob,
  deleteJob,
  getCompanyJobs,
} from "../controllers/companyController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerCompany);
router.post("/signin", signInCompany);
router.put("/profile", authenticateUser, updateCompanyProfile);
router.get("/profile", authenticateUser, getCompanyProfile);
router.get("/", getCompanies);
router.get("/:id", getCompanyById);
router.post("/job", authenticateUser, createJob);
router.put("/job/:jobId", authenticateUser, updateJob);
router.delete("/job/:jobId", authenticateUser, deleteJob);
router.get("/jobs/:id", getCompanyJobs);

export default router;
