const joi = require('joi');
const ApiError = require('../Utils/ApiError');
const ApiResponse = require('../Utils/ApiResponse');

exports.doctorValidation = (req,res,next)=>{
    const schema = joi.object({
        specialization : joi.string().min(3).max(100).required(),
        licenseNumber : joi.string().min(3).max(50).required(),
        degree : joi.string().min(2).max(50).required(),
        name : joi.string().min(3).max(50).required()
    });

    const {error} = schema.validate(req.body);

    if(error)
        return next(new ApiError(`Validation error -> ${error}`,400));

    next();
}