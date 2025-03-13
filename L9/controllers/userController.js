const User = require('../models/userModel');
const TokenBlacklist = require('../models/tokenBlacklistModel');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
   try {
      const { name, email, password, age, phone, address } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
         return res.status(400).json({ error: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashedPassword, age, phone, address });
      //const user = await newUser.save();
      const user = await User.create(newUser);
      res.status(201).json({ user });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};



const login = async (req, res) => {
   try {
      const { email, password } = req.body;
      const user = await User.findOne({
         email
      });
      if (!user) {
         return res.status(404).json({ error: 'User not found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         return res.status(400).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
         expiresIn: '1h'
      });
      res.status(200).json({ token });

   }
   catch (error) {
      res.status(400).json({ error: error.message });
   }
}

const logout = async (req, res) => {
   try {
      const token = req.headers.authorization;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const expiresAt = new Date(decoded.exp * 1000);
      await TokenBlacklist.create({ token, expiresAt });

      res.status(200).json({ message: 'Logged out successfully' });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
}

const getUserDetails = async (req, res) => {
   try {
      const user = await User.findById(req.user.id).select('-password');
      res.status(200).json({ user });
   }
   catch (error) {
      res.status(400).json({ error: error.message });
   }

};

const updatePassword = async (req, res) => {
   try {
      const { oldPassword, newPassword } = req.body;
      const user = await User.findById(req.user.id);
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
         return res.status(400).json({ error: 'Invalid credentials' });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
      res.status(200).json({ message: 'Password updated successfully' });
   }
   catch (error) {
      res.status(400).json({ error: error.message });
   }
}

const refreshToken = async (req, res) => {
   try {
      const oldToken = req.headers.authorization;
      const decoded = jwt.verify(oldToken, process.env.JWT_SECRET);

      // Calculate token expiration date
      const expiresAt = new Date(decoded.exp * 1000);

      // Add old token to blacklist
      await TokenBlacklist.create({ token: oldToken, expiresAt });

      const newToken = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
         expiresIn: '1m'
      });
      res.status(200).json({ token: newToken });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
}


const cleanBlacklist = async () => {
   try {
      await TokenBlacklist.deleteMany({ expiresAt: { $lt: new Date() } });
   } catch (error) {
      console.error('Error cleaning blacklist:', error.message);
   }
}


module.exports = { register, login, getUserDetails, updatePassword, refreshToken, cleanBlacklist, logout };