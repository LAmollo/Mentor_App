const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('./models/userModel');
const Company = require('./models/companyModel');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB for seeding');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});

// Sample data
const users = [
    {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password98766534', // Always use hashed passwords
        profile: {
            academics: [
                { course: 'Computer Science', grade: 'A', year: '2024' }
            ],
            sports: [
                { name: 'Basketball', position: 'Point Guard', achievements: 'MVP' }
            ],
            internships: [
                { company: 'TechCorp', role: 'Intern', duration: '3 months', description: 'Worked on web development' }
            ],
            work: [
                { company: 'Freelance', role: 'Web Developer', duration: '6 months', description: 'Developed websites for clients' }
            ],
            activities: [
                { title: 'Hackathon', description: 'Participated in a 48-hour hackathon', date: new Date() }
            ]
        }
    }
];

const companies = [
    {
        name: 'TechCorp',
        industry: 'Technology',
        mentors: [
            { name: 'Alice Smith', email: 'alice.smith@techcorp.com', skills: ['JavaScript', 'React'], industry: 'Technology' }
        ]
    }
];

// CRUD operations for Users
const userCRUD = async () => {
    try {
        // Create
        const newUser = new User({
            name: 'Jane Doe',
            email: 'jane.doe@example.com',
            password: 'password123',
            profile: {
                academics: [
                    { course: 'Mathematics', grade: 'A', year: '2023' }
                ],
                sports: [
                    { name: 'Soccer', position: 'Forward', achievements: 'Top Scorer' }
                ],
                internships: [
                    { company: 'FinanceCorp', role: 'Intern', duration: '4 months', description: 'Worked on financial analysis' }
                ],
                work: [
                    { company: 'Retail', role: 'Cashier', duration: '1 year', description: 'Managed sales transactions' }
                ],
                activities: [
                    { title: 'Math Olympiad', description: 'Participated in regional math competition', date: new Date() }
                ]
            }
        });
        await newUser.save();
        console.log('User created:', newUser);

        // Read
        const foundUser = await User.findOne({ email: 'jane.doe@example.com' });
        console.log('User found:', foundUser);

        // Update
        foundUser.name = 'Jane Smith';
        await foundUser.save();
        console.log('User updated:', foundUser);

        // Delete
        await User.deleteOne({ email: 'jane.doe@example.com' });
        console.log('User deleted');
    } catch (error) {
        console.error('Error with User CRUD operations:', error);
    }
};

// CRUD operations for Companies
const companyCRUD = async () => {
    try {
        // Create
        const newCompany = new Company({
            name: 'FinanceCorp',
            industry: 'Finance',
            mentors: [
                { name: 'Bob Johnson', email: 'bob.johnson@financecorp.com', skills: ['Excel', 'Accounting'], industry: 'Finance' }
            ]
        });
        await newCompany.save();
        console.log('Company created:', newCompany);

        // Read
        const foundCompany = await Company.findOne({ name: 'FinanceCorp' });
        console.log('Company found:', foundCompany);

        // Update
        foundCompany.industry = 'Financial Services';
        await foundCompany.save();
        console.log('Company updated:', foundCompany);

        // Delete
        await Company.deleteOne({ name: 'FinanceCorp' });
        console.log('Company deleted');
    } catch (error) {
        console.error('Error with Company CRUD operations:', error);
    }
};

// Seed data and perform CRUD operations
const seedData = async () => {
    try {
        await User.deleteMany({});
        await Company.deleteMany({});
        await User.insertMany(users);
        await Company.insertMany(companies);
        console.log('Data seeded successfully');
        
        // Perform CRUD operations
        await userCRUD();
        await companyCRUD();
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedData();
