import mongoose from "mongoose";
import Companies from "../models/companiesModel.js";

// Register a new company
export const registerCompany = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next("All fields are required");
  }

  try {
    const accountExist = await Companies.findOne({ email });
    if (accountExist) return next("Email Already Registered");

    const company = await Companies.create({ name, email, password });
    const token = company.createJWT();

    res.status(201).json({
      success: true,
      message: "Company Account Created Successfully",
      user: {
        _id: company._id,
        name: company.name,
        email: company.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Sign in an existing company
export const signInCompany = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next("Please Provide Company Credentials");
  }

  try {
    const company = await Companies.findOne({ email }).select("+password");
    if (!company) return next("Invalid email or Password");

    const isMatch = await company.comparePassword(password);
    if (!isMatch) return next("Invalid email or Password");

    company.password = undefined;
    const token = company.createJWT();

    res.status(200).json({
      success: true,
      message: "Login Successfully",
      user: company,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Update company profile
export const updateCompanyProfile = async (req, res, next) => {
  const { name, contact, location, profileUrl, about } = req.body;

  try {
    if (!name || !location || !about || !contact || !profileUrl) {
      return next("Please Provide All Required Fields");
    }

    const id = req.body.user.userId;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No Company with id: ${id}`);

    const updateCompany = { name, contact, location, profileUrl, about };
    const company = await Companies.findByIdAndUpdate(id, updateCompany, { new: true });
    const token = company.createJWT();

    company.password = undefined;
    res.status(200).json({
      success: true,
      message: "Company Profile Updated Successfully",
      company,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Get company profile
export const getCompanyProfile = async (req, res, next) => {
  try {
    const id = req.body.user.userId;
    const company = await Companies.findById({ _id: id });
    if (!company) {
      return res.status(404).json({
        message: "Company Not Found",
        success: false,
      });
    }
    company.password = undefined;
    res.status(200).json({
      success: true,
      data: company,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Get all companies with filters and sorting
export const getCompanies = async (req, res, next) => {
  try {
    const { search, sort, location } = req.query;
    const queryObject = {};

    if (search) queryObject.name = { $regex: search, $options: "i" };
    if (location) queryObject.location = { $regex: location, $options: "i" };

    let queryResult = Companies.find(queryObject).select("-password");

    if (sort === "Newest") queryResult = queryResult.sort("-createdAt");
    if (sort === "Oldest") queryResult = queryResult.sort("createdAt");
    if (sort === "A-Z") queryResult = queryResult.sort("name");
    if (sort === "Z-A") queryResult = queryResult.sort("-name");

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const total = await Companies.countDocuments(queryResult);

    queryResult = queryResult.limit(limit * page);
    const companies = await queryResult;

    res.status(200).json({
      success: true,
      total,
      data: companies,
      page,
      numOfPage: Math.ceil(total / limit),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Get a company by ID
export const getCompanyById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const company = await Companies.findById({ _id: id }).populate({
      path: "jobPosts",
      options: { sort: "-_id" },
    });
    if (!company) {
      return res.status(404).json({
        message: "Company Not Found",
        success: false,
      });
    }
    company.password = undefined;
    res.status(200).json({
      success: true,
      data: company,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Create a job post
export const createJob = async (req, res, next) => {
  try {
    const {
      jobTitle, jobType, location, salary, vacancies, experience, desc, requirements
    } = req.body;

    if (!jobTitle || !jobType || !location || !salary || !requirements || !desc) {
      return next("Please Provide All Required Fields");
    }

    const id = req.body.user.userId;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No Company with id: ${id}`);

    const jobPost = {
      jobTitle, jobType, location, salary, vacancies, experience,
      detail: { desc, requirements },
      company: id,
    };

    const job = new Jobs(jobPost);
    await job.save();

    const company = await Companies.findById(id);
    company.jobPosts.push(job._id);
    await Companies.findByIdAndUpdate(id, company, { new: true });

    res.status(200).json({
      success: true,
      message: "Job Posted Successfully",
      job,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Update a job post
export const updateJob = async (req, res, next) => {
  try {
    const {
      jobTitle, jobType, location, salary, vacancies, experience, desc, requirements
    } = req.body;
    const { jobId } = req.params;

    if (!jobTitle || !jobType || !location || !salary || !desc || !requirements) {
      return next("Please Provide All Required Fields");
    }

    if (!mongoose.Types.ObjectId.isValid(jobId))
      return res.status(404).send(`No Job with id: ${jobId}`);

    const updateJob = {
      jobTitle, jobType, location, salary, vacancies, experience,
      detail: { desc, requirements },
    };

    const job = await Jobs.findByIdAndUpdate(jobId, updateJob, { new: true });
    if (!job) return res.status(404).send("Job Post Not Found");

    res.status(200).json({
      success: true,
      message: "Job Updated Successfully",
      job,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a job post
export const deleteJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(jobId))
      return res.status(404).send(`No Job with id: ${jobId}`);

    const job = await Jobs.findByIdAndDelete(jobId);
    if (!job) return res.status(404).send("Job Post Not Found");

    const company = await Companies.findById(job.company);
    if (company) {
      company.jobPosts = company.jobPosts.filter((id) => id.toString() !== jobId);
      await Companies.findByIdAndUpdate(company._id, company, { new: true });
    }

    res.status(200).json({
      success: true,
      message: "Job Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Get all jobs by company ID
export const getCompanyJobs = async (req, res, next) => {
  try {
    const { id } = req.params;
    const jobs = await Jobs.find({ company: id }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
