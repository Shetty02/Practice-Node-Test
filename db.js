const mongoose = require("mongoose");

mongoose.set('strictQuery', false);
const mongoURL = "mongodb+srv://NehalShetty:12345@todo-nodejs.phzdwkh.mongodb.net/Practice-Node-Test";
mongoose.connect( mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
.then(()=>{
    console.log("Successfully Connected to DB");
})
.catch(()=>{
    console.log("Failed to Connect DB.")
})

module.exports = mongoURL;