const expressAsyncHandler = require("express-async-handler");
const jwt =  require("jsonwebtoken");
const ApiResponse = require("../config/common_response");



const checkAuthenticity = expressAsyncHandler((req, res , next)=>{
    let token;
    console.log(req?.headers.authorization);
    if(req?.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
// check token variable is neither null nor undefined nor an empty string.
// Falsy Values: In JavaScript, the following values are considered falsy:
//1. false
//2. 0
//3. "" (empty string)
//4. null
//5. undefined
//6. NaN

    if(token){
        try {
      const decoded =   jwt.verify(token, process.env.JWT_SECRETE);
      console.log(decoded);
      next();
    } catch (error) {
      
      // console.log(error)
      throw new Error("user Not Authorize")
            
    }
    }
}

});
module.exports = {
  checkAuthenticity
}