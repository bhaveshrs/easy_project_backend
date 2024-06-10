const mongoose = require('mongoose'); 

// Declare the Schema of the Mongo model
var bidSchema = new mongoose.Schema({
    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    developerId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    amount:{
        type:Number,
    },
    createdAt: {type: Date, default: Date.now},
    paymentDone : {
       type:Number,
    }
},);

//Export the model
module.exports = mongoose.model('bidModel', bidSchema);