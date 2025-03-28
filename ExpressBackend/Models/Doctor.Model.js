const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    userId : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    specialization : {
        type : String,
        required: true
    },
    licenseNumber : {
        type : String,
        required : true
    },
    degree : {
        type : String,
        required : true
    },
    licenseImage : {
        type : String
    },
    takeACall : {
        type : Boolean,
        default : false
    },
    name : {
        type : String,
        required : true
    },
    active : {
        type : Boolean,
        default : false
    },
    status:{
        type : String,
        default : 'Pending'
    }
},{timestamps:true});

const Doctor = mongoose.model('doctor',doctorSchema);

module.exports = Doctor;