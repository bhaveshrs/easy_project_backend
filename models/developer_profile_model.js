const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require("bcrypt")

// Declare the Schema of the Mongo model
var developerProfileSchema = new mongoose.Schema({
    developerName:{
        type:String,
        required:true,
      
    },
    education:{
        type:String,
        required:true,
    },
    location:{
        type:String,
    },
    about: {
        type: Boolean,
        default: false // Set a default value if needed
    },
    skills: {
        type: [String],
        default: [] // Optional: set a default value to an empty array
    },
    tags: {
        type: [String],
        default: [] // Optional: set a default value to an empty array
    },
    projects:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }]
},
{ timestamps: true },
);


//Export the model
module.exports = mongoose.model('DeveloperProfile', developerProfileSchema);