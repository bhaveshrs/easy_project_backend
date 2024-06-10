const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require("bcrypt")

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    password:{
        type:String,
        required:true,
    },
    fullName:{
        type:String,
    },
    isAdmin: {
        type: Boolean,
        default: false // Set a default value if needed
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    },
    projects:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }]
},
{ timestamps: true },
);
userSchema.pre("save" , async function(next){
    try {
        // Generate a salt
        const salt = await bcrypt.genSaltSync(10);

        // Hash the password with the salt
        const hashedPassword = await bcrypt.hash(this.password, salt);

        // Replace the plain text password with the hashed password
        this.password = hashedPassword;

        next();
    } catch (error) {
        next(error); // Pass the error to the next middleware or error handler
    }

});

userSchema.methods.isPasswordMatched =  async function(enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password);
}


//Export the model
module.exports = mongoose.model('User', userSchema);