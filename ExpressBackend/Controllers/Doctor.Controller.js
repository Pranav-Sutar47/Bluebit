const Doctor = require('../Models/Doctor.Model');
const asyncHandler = require('../Middleware/asyncHandler');
const ApiResponse = require("../Utils/ApiResponse");
const ApiError = require("../Utils/ApiError");
const User = require('../Models/User.Model');

exports.addDoctorInfo = asyncHandler(async(req,res,next)=>{
    const {specialization,licenseNumber,degree,name} = req.body;
    
    const user = req.user;

    const userData = await User.findOne({ email: user.email });

    const userId = userData._id;

    if (!user || !user.email) {
        throw new ApiError("Invalid user data", 400);
    }

    if (!req.file) 
        throw new ApiError('No file uploaded !',400);

    const imageUrl = req.file.path;

    const doctor = await Doctor.create({
        userId,
        name,
        specialization,
        licenseNumber,
        degree,
        licenseImage: imageUrl, 
        status: "pending", 
    });

    console.log(doctor);

    if(doctor)
        res.status(201).json(new ApiResponse(201,'Doctor data saved successfully!',doctor));
    else 
        throw new ApiError('Error while saving doctor data',400);
});

exports.getDoctorInfo = asyncHandler(async(req,res,next)=>{
    const user = req.user;
    if(!user)
        return next(new ApiError('User not Found',400));
    const doctor = await Doctor.findOne({userId:user.user_id});
    if(!doctor)
        return next(new ApiError('Doctor details not found',404)); 
    res.status(200).json(new ApiResponse(200,'Doctor details fetched',doctor)); 
});

exports.logOut = asyncHandler(async(req,res,next)=>{
    const user = req.user;
    if(!user)
        return next(new ApiError('User not Found',400));
    const doctor = await Doctor.findOneAndUpdate({userId:user.user_id},{active:false,takeACall:false},{new:true});
    const userData = await User.findOneAndUpdate({_id:user.user_id},{active:false},{new:true});
    if(!doctor || !userData)
        return next(new ApiError('Error while logout',404));
    res.status(200).json(new ApiResponse(200,'Logout Successful'));
});

exports.takeCall = asyncHandler(async(req,res,next)=>{
    const user = req.user;
    if(!user)
        return next(new ApiError('User not Found',400));
    const doctor = await Doctor.findOne({ userId: user.user_id });
    if (!doctor)
        return next(new ApiError("Doctor not found", 404));
    if(doctor.takeACall === false)
        doctor.active = true;
    doctor.takeACall = !doctor.takeACall;
    await doctor.save();
    res.status(200).json(new ApiResponse(200, "Call status updated successfully", doctor));
});

exports.getActiveDoctors = asyncHandler(async(req,res,next)=>{
    const doctors = await Doctor.find({active:true,takeACall:true});
    res.status(200).json(new ApiResponse(200,'Active Doctors Fetched',doctors));
});

exports.getName = asyncHandler(async(req,res,next)=>{
    const user = req.user;
    // console.log(user);
    const name = await Doctor.findOne({userId:user.user_id}).select('name');
    if(!name)
        return next(new ApiError('No Doctor found',404)); 
    res.status(200).json(new ApiResponse(200,'Name fetched Successfully',name));
});