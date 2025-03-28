const express = require('express');
const router = express.Router();
const {upload} = require('../config/cloudinaryConfig');
const { doctorValidation } = require('../Middleware/Doctor.middleware');
const { addDoctorInfo, getDoctorInfo, logOut, takeCall, getActiveDoctors } = require('../Controllers/Doctor.Controller');
const { verifyToken } = require('../Middleware/User.middleware');


router.route('/add-data').post(verifyToken,upload.single('image'), doctorValidation,addDoctorInfo);

router.route('/').get(verifyToken,getDoctorInfo);

router.route('/logout').get(verifyToken,logOut);

router.route('/toggleCall').get(verifyToken,takeCall);

router.route('/get-active-doctors').get(verifyToken,getActiveDoctors);

module.exports = router;

