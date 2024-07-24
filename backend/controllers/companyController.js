const Company = require('../models/companyModel');

const registerCompany = async (req, res) => {
    const { name, industry, mentors } = req.body;

    try {
        const company = new Company({ name, industry, mentors });
        await company.save();
        res.status(201).json(company);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { registerCompany };
