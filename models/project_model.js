const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userProjectSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    skills: {
        type: [String],
        default: [] // Optional: set a default value to an empty array
    },
    budgetRange: {
        min: {
            type: String,
            required: true
        },
        max: {
            type: String,
            required: true
        }
    },
    userProjectDescription:{
        type:String,
        required: true
    },
    priorityLevel:{
        type:String,
        required: true
    },
    deadLineDate:{
        type:String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userId',
        required:true,
       
       
    },
  
    
   
});

//Export the model
module.exports = mongoose.model('UserProject', userProjectSchema);