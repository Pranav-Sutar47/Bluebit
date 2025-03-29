const User = require('../Models/User.Model');
const asyncHandler = require('../Middleware/asyncHandler');
const ApiResponse = require("../Utils/ApiResponse");
const ApiError = require("../Utils/ApiError");
const axios = require('axios');

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

    const {current_disease,past_disease,allergy_information,surgical_procedure,location} = req.body;

    if(!current_disease || !past_disease || !allergy_information || !surgical_procedure || !location)
        return next(new ApiError('Please Provide all the details',400));

    const updated = await User.findOneAndUpdate(
        { email: user.email },
        {current_disease:current_disease,past_disease:past_disease,allergy_information:allergy_information,surgical_procedure:surgical_procedure,location:location},
        { new: true}
    );

    if(updated)
        res.status(200).json(new ApiResponse(200,'Medical History Updated Successfully',updated));
    else 
        return next(new ApiError('Error while saving user medical history',500));
});

exports.addSuggestions = asyncHandler(async(req,res,next)=>{

    const {id} = req.params;

    const {suggestions} = req.body;

    if(!suggestions)
        return next(new ApiError('Please provide Suggestion',400));

    const updated = await User.findOneAndUpdate(
        {_id:id},
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

exports.addLocation = asyncHandler(async(req,res,next)=>{
    const user = req.user;
    if(!user)
        return next(new ApiError('User not found',404));
    const {location} = req.body;
    if (!location || !Array.isArray(location) || location.length !== 2) {
        return next(new ApiError("Invalid coordinates format. Expected [longitude, latitude]", 400));
    }
    const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { location: { type: "Point", location:location } },
        { new: true}
    );    
    if(!updatedUser)
        return next(new ApiError('Location not updated',400));
    res.status(200).json(new ApiResponse(200,'Location Updated Successfully!',updatedUser));
});

exports.nearbyLocation = asyncHandler(async(req,res,next)=>{
    const user = req.user;
    if(!user)
        return next(new ApiError('User not found',404));
    const userData = await User.findById(user.user_id).select("location");
    console.log(userData);
    if (!userData || !userData.location) {
        return next(new ApiError("User location not found", 400));
    }
    const [longitude, latitude] = userData.location.coordinates;

    console.log('long->',longitude,'\n lat->',latitude);

    try{
        const OSM_API_URL = `https://overpass-api.de/api/interpreter`;
        const query = `
            [out:json];
            node
                [amenity=hospital]
                (around:5000, ${latitude}, ${longitude});
            out;
        `;
        const response = await axios.get(OSM_API_URL, {
            params: { data: query },
        });

        const hospitals = response.data.elements.map(hospital => ({
            name: hospital.tags.name || "Unknown",
            lat: hospital.lat,
            lon: hospital.lon,
        }));

        res.status(200).json(new ApiResponse(200, "Nearby Medical Centers", hospitals));
    }catch(err){
        console.error(err);
        return next(new ApiError("Error fetching nearby hospitals", 500));
    }
});

