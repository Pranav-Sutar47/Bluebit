const User = require('../Models/User.Model');
const asyncHandler = require('../Middleware/asyncHandler');
const ApiResponse = require("../Utils/ApiResponse");
const ApiError = require("../Utils/ApiError");

exports.getUsers = asyncHandler(async(req,res)=>{
    console.log(req.user);
    const users = await User.find();
    res.status(200).json(new ApiResponse(200, "Users retrieved successfully", users));
});

exports.setUserRole = asyncHandler(async (req, res) => {
    const user = req.user;
    const { role } = req.body; 

    if (!user || !user.email) {
        return res.status(400).json({ message: "Invalid user data" });
    }

    if (!role) {
        return res.status(400).json({ message: "Role is required" });
    }

    const result = await User.findOneAndUpdate(
        { email: user.email }, 
        { role: role },
        { new: true, runValidators: true }
    );

    if (!result) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User role updated successfully", user: result });
});

