const jwt = require('jsonwebtoken');

// A function that checks for a valid authentication token
const authFoodPartnerMiddleware = (req, res, next) => {
    // Middleware logic to authenticate the user goes here.
    // For example, checking for a token in the request headers.

    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // The token is sent in the format "Bearer <token>". We need to split it to get the token part.
    const token = authHeader.split(' ')[1];
    
    // Check if the token was successfully extracted
    if (!token) {
        return res.status(401).json({ message: 'Token is not valid' });
    }

    try {
        // Verify the token using the hardcoded secret key.
        // It is recommended to use an environment variable for this.
        const decoded = jwt.verify(token, "273aaaf228c14ca34f64cf103f51e820");
        
        // Attach the authenticated user to the request object
        req.foodPartner = decoded.user;
        next(); // Call the next middleware function
    } catch (e) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

const authUserMiddleware = (req, res, next) => {
    // This middleware retrieves the token from a cookie.
    const token = req.cookies.token;
    
    if (!token) {
        return res.status(401).json({
            message: "Please login first"
        });
    }

    try {
        // Verify the token
        // IMPORTANT: The secret key here must match the one used to sign the token for users.
        const decoded = jwt.verify(token, "273aaaf228c14ca34f64cf103f51e820");

        // The payload for the user token is just the ID, not an object with a user key
        req.user = decoded.id; 

        next();
    } catch (err) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
};

// You must export the function so it can be used in your routes file.
// The name must match exactly.
module.exports = {
    authFoodPartnerMiddleware,
    authUserMiddleware
};
