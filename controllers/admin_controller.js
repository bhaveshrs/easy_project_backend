const expressAsyncHandler = require("express-async-handler");
const User = require("../models/user_model");
const Profile = require("../models/profile_model")
const { generateToken } = require("../config/genrate_jwt");
const ApiResponse = require("../config/common_response");
const BidModel = require("../models/bid_model");

const addProjectForSell = expressAsyncHandler((req, res)=>{
    

});

const putBidOnProject =  expressAsyncHandler(async(req, res)=>{
    try {
    const bidModel = new BidModel(req.body);
    const alreadyBided = await  BidModel.findOne({projectId: bidModel.projectId, developerId:bidModel.developerId})
    console.log("i am alreday ideeed",alreadyBided ,"i am alreday ideeed")

    if(alreadyBided){
       return res.json(new ApiResponse({message:"Already bided on this project"}));
    }
    console.log(bidModel.projectId);
    console.log(bidModel.developerId);
    console.log(bidModel);  
    await  BidModel.create(bidModel)
    res.json(new ApiResponse({data: bidModel , message:"bid place successfully"}))
} catch (error) {
    console.log(error)
    res.json(new ApiResponse({message:"something went wrong", status:"failed"}))     
} 
});
module.exports = {putBidOnProject}

