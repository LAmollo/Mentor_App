const User = require('../models/userModel');
const Company = require('../models/companyModel');

const matchMentors = async (req, res) => {
    try {
        const user = await User.findById(req.params.studentId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const mentors = await Company.aggregate([
            { $unwind: '$mentors' },
            {
                $match: {
                    'mentors.industry': user.profile.internships[0].industry,
                },
            },
            { $project: { mentors: 1, _id: 0 } },
        ]);

        res.json(mentors);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { matchMentors };
