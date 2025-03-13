const jwt = require('jsonwebtoken');

let authUser = (req, res, next) => {
   try {
      const token = req.header('Authorization');
      if (!token) {
         return res.status(401).json({ error: 'Unauthorized' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
   } catch (error) {
      console.error("JWT Verify Error:", error.message);
      res.status(401).json({ error: 'Unauthorized' });
   }
};

module.exports = { authUser };