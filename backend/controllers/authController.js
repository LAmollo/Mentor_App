import Users from "../models/userModel.js";

// Register a new user
export const registerUser = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !email || !lastName || !password) {
    return next("All fields are required");
  }

  try {
    const userExist = await Users.findOne({ email });
    if (userExist) return next("Email Address already exists");

    const user = await Users.create({ firstName, lastName, email, password });
    const token = await user.createJWT();

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        accountType: user.accountType,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Sign in an existing user
export const signInUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next("Please Provide User Credentials");
  }

  try {
    const user = await Users.findOne({ email }).select("+password");
    if (!user) return next("Invalid email or password");

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return next("Invalid email or password");

    user.password = undefined;
    const token = user.createJWT();

    res.status(200).json({
      success: true,
      message: "Login successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
