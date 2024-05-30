const  mongoose  = require("mongoose");
const expressAsyncHandler = require("express-async-handler")



const dbConnect = expressAsyncHandler(async()=> {
    try {

        
   await mongoose.connect(process.env.MONGO_URL).then(console.log("mongo connected successfully"))
} catch (error) {
        
}

});
module.exports = {dbConnect}