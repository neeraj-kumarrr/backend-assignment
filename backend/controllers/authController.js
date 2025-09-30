import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Login - ALL USERS (admin, manager, user) can login
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log(` LOGIN ATTEMPT: ${username}`);

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      console.log(` LOGIN FAILED: User ${username} not found`);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log(` lOGIN FAILED: Wrong password for ${username}`);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token (15 minutes expiry)
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    console.log(` LOGIN SUCCESS: ${user.role.toUpperCase()} ${user.username} logged in`);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Verify token - ALL authenticated users
export const verifyToken = (req, res) => {
  res.json({
    message: "Token is valid",
    user: {
      id: req.user._id,
      username: req.user.username,
      role: req.user.role,
    },
  });
};

// Logout - ALL authenticated users
export const logoutUser = (req, res) => {
  console.log(`🚪 LOGOUT: ${req.user.role.toUpperCase()} ${req.user.username} logged out`);
  res.json({ message: "Logout successful" });
};
