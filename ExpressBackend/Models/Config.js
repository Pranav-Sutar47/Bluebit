const mongoose = require("mongoose");

const MAINURL = process.env.MAIN_URL;

if (!MAINURL) {
    console.error(" MAIN_URL is not defined in environment variables!");
    process.exit(1);
}


mongoose.connect(MAINURL);

const db = mongoose.connection;


db.once("open", async () => {
    console.log("Main DB Connected");
});

// Handle connection errors
db.on("error", (err) => {
    console.error("Main DB Error:", err);
    process.exit(1);
});

module.exports = { db };