const User = require('../Models/User.Model');
const asyncHandler = require('../Middleware/asyncHandler');
const ApiResponse = require("../Utils/ApiResponse");
const ApiError = require("../Utils/ApiError");

//Route to get all active patients
exports.getUsers = asyncHandler(async(req,res)=>{
    console.log(req.user);
    const users = await User.find({active:true});

    res.status(200).json(new ApiResponse(200,'Users fetched',users));
});

exports.setUserRole = asyncHandler(async (req, res,next) => {
    const user = req.user;
    const { role } = req.body; 

    if (!user || !user.email) {
        return next(new ApiError("Invalid user data", 400));
    }

    if (!role) {
        return next(new ApiError("Role is required", 400));
    }

    console.log(user);

    const result = await User.findOneAndUpdate(
        { email: user.email }, 
        { role: role },
        { new: true}
    );

    if (!result) {
        return next(new ApiError("User not found", 404));
    }

    res.status(200).json(new ApiResponse(200, "User role updated successfully", result));
});

exports.getMedicalDetails = asyncHandler(async(req,res,next)=>{
    const user = req.user;

    const userDetails = await User.findOne({email : user.email});

    if(!userDetails)
        return next(new ApiError('User details not found',400));

    res.status(200).json(new ApiResponse(200,'User Details found',userDetails));
});

exports.addMedicalDetails = asyncHandler(async(req,res,next)=>{
    const user = req.user;

    if(!user)
        return next(new ApiError('User not found',404));

    const {current_disease,past_disease,allergy_information,surgical_procedure} = req.body;

    if(!current_disease || !past_disease || !allergy_information || !surgical_procedure)
        return next(new ApiError('Please Provide all the details',400));

    const updated = await User.findOneAndUpdate(
        { email: user.email },
        {current_disease:current_disease,past_disease:past_disease,allergy_information:allergy_information,surgical_procedure:surgical_procedure},
        { new: true}
    );

    if(updated)
        res.status(200).json(new ApiResponse(200,'Medical History Updated Successfully',updated));
    else 
        return next(new ApiError('Error while saving user medical history',500));
});

exports.addSuggestions = asyncHandler(async(req,res,next)=>{
    const user = req.user;

    if(!user)
        return next(new ApiError('User not found',404));

    const {suggestions} = req.body;

    if(!suggestions)
        return next(new ApiError('Please provide Suggestion',400));

    const updated = await User.findOneAndUpdate(
        {email:user.email},
        {suggestions:suggestions},
        { new: true}
    );

    if(!updated)
        return next(new ApiError('Error while updating suggestions',400));

    return res.status(200).json(new ApiResponse(200,'Suggestion added successfully !',updated));
});

exports.logOut = asyncHandler(async(req,res,next)=>{
    const user = req.user;
    if(!user)
        return next(new ApiError('User not found',404));
    const updated = await User.findOneAndUpdate(
        {_id:user.user_id},
        {active:false},
        {new:true}
    );
    if(!updated)
        return next(new ApiError('Error while logout',400));

    return res.status(200).json(new ApiResponse(200,'Logout successfully !',updated));
});