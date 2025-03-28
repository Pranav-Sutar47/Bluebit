const ApiError = require("../Utils/ApiError");

const errorMiddleware = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    res.status(statusCode).json({ 
        success: false, 
        statusCode, 
        message 
    });
};

module.exports = errorMiddleware;