const User = require("../models/Users"); // Make sure the model name matches your file
const jwt = require("jsonwebtoken");
// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("email password -_id");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Add a new user
exports.addUser = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const user = new User({ email, password, name });
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.signUp = async (req, res) => {
  const { email, password, name, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // console.log("User already exists");
      return res.status(400).json({ message: "User already exists" });
    } else {
      // console.log("User does not exist");
      // Create new user
      const newUser = new User({ name, email, password, role: role || "user" });
      await newUser.save();
      res.status(201).json({
        message: "User registered successfully",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Compare password with hashed one
    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role || "user" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.changePassword = async (req, res) => {
  const { password, confirmPassword } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      const isCorrectPassword = await user.comparePassword(password);
      if (!isCorrectPassword) {
        return res.status(400).json({ message: "Incorrect password" });
      } else {
        user.password = confirmPassword;
        await user.save();
        return res
          .status(200)
          .json({ message: "Password changed successfully" });
      }
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
