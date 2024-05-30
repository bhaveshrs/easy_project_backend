const express = require('express');
const { createUser, login, getUserData, updateUserPassword,  createProfile } = require('../controllers/user_controller');
const { checkAuthenticity } = require('../middelwares/auth_middelware');
const authRouter = express.Router();




authRouter.post("/register" ,createUser );
authRouter.post("/log-in" ,login );
authRouter.get("/user-profile/:id" ,checkAuthenticity , getUserData  );
authRouter.post("/update-Password/:id" ,checkAuthenticity , updateUserPassword  );
authRouter.post("/createProfile"  , createProfile  );


module.exports = {authRouter}