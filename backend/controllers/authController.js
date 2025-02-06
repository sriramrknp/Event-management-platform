const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password, role: 'user' });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');
    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error('Invalid credentials');
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log("User found");
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Guest login
exports.guestLogin = async (req, res) => {
  try {
    const guestUser = new User({ name: 'Guest', email: `guest-${Date.now()}@example.com`, password: 'guest', role: 'guest' });
    await guestUser.save();
    const token = jwt.sign({ id: guestUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: guestUser._id, name: guestUser.name, email: guestUser.email } });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};