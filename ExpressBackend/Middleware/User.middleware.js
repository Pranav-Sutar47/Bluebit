const jwt = require("jsonwebtoken");

const SECRET_KEY = String(process.env.JWTSECRET);

function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];  // Extract token from "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
}

module.exports = {verifyToken};
