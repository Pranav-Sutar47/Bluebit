const express = require('express');

const router = express.Router();

const {getUsers, setUserRole} = require('../Controllers/User.Controller');
const {verifyToken} = require('../Middleware/User.middleware');

router.route('/').get(verifyToken,getUsers);

router.route('/set-role').post(verifyToken,setUserRole);

module.exports = router;