const expressAsyncHandler = require("express-async-handler");
const User = require("../models/user_model");
const Profile = require("../models/profile_model")
const { generateToken } = require("../config/genrate_jwt");
const ApiResponse = require("../config/common_response");

const createUser = expressAsyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const userModel = User(req.body);
    const email = userModel.email;
    await userModel.validate();

    const userAlreadyExist = await User.findOne({ email });
    if (!userAlreadyExist) {
      const savedUser = await User.create(userModel);
      const jsonWebToken = generateToken(savedUser._id);
      const userResponseData = {
        user: savedUser,
        token: jsonWebToken,
      };
      
      res.json(
        new ApiResponse({message:"user registered successfully" ,data:userResponseData})
    );
    } else {
      res.json(
      new ApiResponse({message:"user already registered" ,status:"failed"})
    );
    }
  } catch (error) {
    console.log(error)
    res.json(new ApiResponse({message:"something went wrong"}));
}});

const login = expressAsyncHandler(async (req, res) => {
  try {
    const userModel = User(req.body);
    console.log(userModel);
    console.log(req.body, "debugging data");
    const email = userModel.email;
    await userModel.validate();
    const userAlreadyExist = await User.findOne({ email });
    if (userAlreadyExist) {
     
      console.log(await userAlreadyExist.isPasswordMatched(userModel.password));
      if (await userAlreadyExist.isPasswordMatched(userModel.password)) {
       
        const jsonWebToken = generateToken(userAlreadyExist._id);

        const userResponseData = {
          user: userAlreadyExist,
          token: jsonWebToken,
        };
        const response = new ApiResponse({
          message: "User logged in successfully",
          data: userResponseData,
        });

        res.json(response);
      } else {
        res.json(
          new ApiResponse({
            message: "Password is not matched",
            status: "failed",
          })
        );
      }
    } else {
      res.json(
        new ApiResponse({
          message: "need to registered first",
          status: "failed",
        })
      );
    }
  } catch (error) {
    console.log(error)
    res.json(new ApiResponse({message:"something went wrong"}));
  }
});

const getUserData = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const userData = await User.findById(id);
    res.json(new ApiResponse({ data: userData }));
  } catch (error) {
    console.log(error)
    res.json(new ApiResponse({message:"something went wrong"}));
  }
});

const updateUserPassword = expressAsyncHandler(async (req, res) => {
  try {
   
    const { id } = req.params;

    const userData = await User.findById(id);
    console.log(userData)
    if (!userData) {
      return res.status(404).json(new ApiResponse({ message: "user not found"}));
  }

// Check if new password is provided
if (updates.password) {
    // Check if provided password matches the current password
    const isMatch = await userData.isPasswordMatched(updates.password);
    console.log(isMatch)
    if (!isMatch) {
        userData.password = updates.password;
      
    } 
}
// password encryption is perform by using this 
await userData.save();
    res.json(new ApiResponse({ message: "password updated successfully", data: userData }));
  } catch (error) {
    console.log(error)
    res.json(new ApiResponse({message:"something went wrong",status:"failed"}));
  }
});


const createProfile = expressAsyncHandler(async (req, res) => {

  const img = req.file;
  const imgurl = `http://localhost:4000/public/images/${img.filename}`;
  // static url fro now need to replace 
  const newProfile = new Profile({...req.body, image: imgurl});
  console.log(newProfile, "new Profile");
  try {
    console.log(newProfile.userId)
      // Check if the user exists
      const user = await User.findById(newProfile.userId);
      if (!user) {
          return res.json(new ApiResponse({ message: "User not found"}));
      }
      // Check if the profile already exists
      console.log(req.file.filename)
      const existingProfile = await Profile.findOne({user: newProfile.userId });
      if (existingProfile) {
          return res.json((new ApiResponse({message: "Profile already exists", data: existingProfile,   })));
      }
      const savedProfile = await newProfile.save();
      res.status(201).json({ message: "Profile created successfully", profile: savedProfile });
  } catch (error) {
      console.error("Error creating profile:", error);
      res.status(500).json({ message: "Internal server error" });
  }
});

const getProfileData = expressAsyncHandler(async(req , res)=>{
  try {
    
 
  const { id } = req.params;

  const ProfileData = await Profile.findOne({userId : id});
  console.log(ProfileData);
  if(!ProfileData){
   return res.json(new ApiResponse({  message: 'Profile not found',
   status: 'failed',}));
 }
  res.json(new ApiResponse({message:"Profile fetched successfully",data:ProfileData}));

} catch (error) {
  console.log(error)
  res.json(new ApiResponse({message:"something went wrong",status:"failed"}));
}


});

module.exports = { createUser, login, getUserData, updateUserPassword , createProfile, getProfileData };
