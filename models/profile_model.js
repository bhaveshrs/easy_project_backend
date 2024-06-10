const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var profileSchema = new mongoose.Schema({
    gender:{
        type:String,
    },
    phoneNumber:{
        type:String,
        required:true,
      
    },
    instagramLink:{
        type:String,
      
    },
    linkedinLink:{
        type:String,
       
    },
    facebookLink:{
        type:String,
       
    },
    currentlyStudying: {
        type: Boolean,
        default: false // Set a default value if needed
    },
    universityName:{
        type:String,
    },
    yearOfGraduation:{
        type:String,
    },
    image:{
        type : String,
        require:true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
   
});

//Export the model
module.exports = mongoose.model('Profile', profileSchema);