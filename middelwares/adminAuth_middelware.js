const expressAsyncHandler = require("express-async-handler");
const User = require("../models/user_model");
const ApiResponse = require("../config/common_response");


const adminAuth = expressAsyncHandler(async(req, res , next)=>{
const user = User(req.body);
try {
    // Assuming user ID is stored in req.user.id by the authentication middleware
    const user = await User.findById(req.body.UserId);

    if (user && user.isAdmin) {
      next(); // User is an admin, proceed to the next middleware/route handler
    } else {
        res.json( new ApiResponse({message:"Access denied. Admins only."}))
    }
  } catch (error) {
    res.json(
        new ApiResponse({message:"Something went wrong" ,data:userResponseData})
    );
   
  }


});

module.exports = {adminAuth  }