const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    firebase_uid: { type: String, unique: true, sparse: true },  // Firebase UID
    name: { type: String, default: "" },
    role: { type: String, default: "" },

    // Medical Fields
    current_disease: { type: String, default: "" },
    past_disease: { type: String, default: "" },
    allergy_information: { type: String, default: "" },
    surgical_procedure: { type: String, default: "" },

    // Other Fields
    active : {type :Boolean,default: false},
    suggestions : {type:String,default:''},
    location: {
        type: { type: String, enum: ["Point"]},
        coordinates: { type: [Number]} // [longitude, latitude]
    },

    // Auth Fields
    is_active: { type: Boolean, default: true },
    is_superuser: { type: Boolean, default: false },

}, { collection: "users" });  // Use the same collection name as Django

const User = mongoose.model("User", userSchema);
module.exports = User;