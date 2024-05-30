const expressAsyncHandler = require("express-async-handler");
const { stack } = require("../routes/auth_route");
const ApiResponse = require("../config/common_response");


const  notFound =  expressAsyncHandler((req , res , next)=> {
    const error = new Error(`not found ${req.originalUrl}`)
    res.status(404);
    next(error);
});


const errorHandler = (error, req , res , next)=> {
    const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
    console.log(`error caught by middleware ${error}`);
    console.log(`error stack ${error.stack}`);
    res.status(statusCode);
    
   
    res.json(
        new ApiResponse({message :error.message , status:"failed"})
        
  
)
};
module.exports = {notFound , errorHandler}