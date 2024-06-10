const express = require('express');
const { checkAuthenticity } = require('../middelwares/auth_middelware');
const { putBidOnProject } = require('../controllers/admin_controller');
const { adminAuth } = require('../middelwares/adminAuth_middelware');
const { addDeveloper, UpdateDeveloper } = require('../controllers/developer_controller');

const adminRouter = express.Router();

adminRouter.post("/bid" ,adminAuth,putBidOnProject );

adminRouter.post("/create-developer", addDeveloper)
adminRouter.post("/update-developer", UpdateDeveloper)

module.exports = {adminRouter}