const express = require('express');
const { createUser, login, getUserData, updateUserPassword,  createProfile , getProfileData} = require('../controllers/user_controller');
const { checkAuthenticity } = require('../middelwares/auth_middelware');
const multer = require('multer');
const path = require('path');
const authRouter = express.Router();


const storage = multer.diskStorage({destination: function(req , file, cb){
    cb(null, path.join(__dirname,"../public/images"), function(err , suc){
        if(err){
            throw err
        }
    });
},
filename : function(req , file , cb){
    const name =  Date.now()+"-" +file.originalname;
    cb(null , name, function(error , success){

    })
}
});
const upload = multer({storage:storage})
// authRouter.use(express.static('public'))


authRouter.post("/register" ,createUser );
authRouter.post("/log-in" ,login );
// authRouter.get("/user-profile/:id" ,checkAuthenticity , getUserData  );
authRouter.post("/update-Password/:id" ,checkAuthenticity , updateUserPassword  );
authRouter.post("/createProfile",upload.single("image"),checkAuthenticity , createProfile  );
authRouter.get("/Profile/:id"  , getProfileData );


module.exports = {authRouter}