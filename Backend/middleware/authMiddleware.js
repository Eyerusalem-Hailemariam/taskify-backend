require('dotenv').config();
const StatusCodes = require('http-status-codes');
const jwt = require('jsonwebtoken');

async function authMiddleware(req, res, next) {
    const autheader = req.headers.authorization;
    

    if (!autheader || !autheader.startsWith('Bearer ')) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Authorization header is missing' });
    }

    const token = autheader.split(' ')[1];

    console.log(autheader);
    console.log(token);

    try {
      const {user_email,user_id, user_role} = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", {user_email, user_id, user_role});
        req.user  = {user_email, user_id, user_role}
        next();
    } catch(error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Internal server error'});

    }

}

module.exports = {
    authMiddleware
}