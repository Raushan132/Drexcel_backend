const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); 
const { JWT_SECRET } = process.env;

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }
  
    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token is not valid' });
        }
       
        try {
          
            const user = await User.findById(decoded.id);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            if(user.disable){
                return res.status(403).json({ message: 'User not authorized' });
            }
            
            // Attach user object to request object
            req.id = decoded.id;
            next();
        } catch (err) {
           
            res.status(500).json({ message: err.message });
        }
    });
};
