const jwt = require('jsonwebtoken');
const blacklist = require('../models/tokenBlacklistModel');

const userController = require('../controllers/userController');

let authUser = async (req, res, next) => {
   try {
      userController.cleanBlacklist();
      const token = req.header('Authorization');
      if (!token) {
         return res.status(401).json({ error: 'Unauthorized' });
      }

      const isBlacklisted = await blacklist.findOne({ token: token });
      if (isBlacklisted) {
         return res.status(401).json({ error: 'Expired' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
   } catch (error) {
      console.error("JWT Verify Error:", error.message);
      res.status(401).json({ error: 'Unauthorized' });
   }
};


let authAccess = async (req, res, next) => {
   try {
      userController.cleanBlacklist();
      const token = req.header('Authorization');
      if (!token) {
         return res.status(401).json({ error: 'Unauthorized' });
      }

      const isBlacklisted = await blacklist.findOne({ token: token });
      if (isBlacklisted) {
         return res.status(401).json({ error: 'Expired' });
      }

      //add to blacklist
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const expiresAt = new Date(decoded.exp * 1000);
      await blacklist.create({ token, expiresAt });

      req.user = decoded;
      next();
   } catch (error) {
      console.error("JWT Verify Error:", error.message);
      res.status(401).json({ error: 'Unauthorized' });
   }
};

module.exports = { authUser, authAccess };