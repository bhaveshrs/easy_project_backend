const express = require("express");
const { addUserProject ,showUserProject} = require("../controllers/project_controller");

const userProjectRouter =  express.Router();


userProjectRouter.post("/add-project/",addUserProject )
userProjectRouter.get("/user-projects/:id", showUserProject)



module.exports ={userProjectRouter}