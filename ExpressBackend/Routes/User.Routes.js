const express = require('express');

const router = express.Router();

const {getUsers, setUserRole, addMedicalDetails, getMedicalDetails, addSuggestions, logOut} = require('../Controllers/User.Controller');
const {verifyToken} = require('../Middleware/User.middleware');

router.route('/').get(verifyToken,getUsers);

router.route('/set-role').post(verifyToken,setUserRole);

router.route('/add-history').post(verifyToken,addMedicalDetails);

router.route('/get-history').get(verifyToken,getMedicalDetails);

router.route('/add-suggestion').post(verifyToken,addSuggestions);

router.route('/logout').get(verifyToken,logOut);

module.exports = router;