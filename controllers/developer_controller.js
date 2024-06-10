const expressAsyncHandler = require("express-async-handler");
const ApiResponse = require("../config/common_response");
const DeveloperModel = require("../models/developer_profile_model");

const addDeveloper = expressAsyncHandler(async (req, res) => {
  try {
    const developerProfile = new DeveloperModel(req.body);

    // Validate the developer profile
    await developerProfile.validate();
    const savedDeveloperProfile = await developerProfile.save();
    // Send a response with the saved developer profile
    res.json(
      new ApiResponse({
        data: savedDeveloperProfile,
        message: "developer added successfully",
      })
    );
  } catch (error) {
    res.json(
      new ApiResponse({
        data: savedDeveloperProfile,
        message: "something went wrong",
      })
    );
  }
});

const UpdateDeveloper = expressAsyncHandler(async (req, res) => {
  try {
    const { developerId, developerName, education, location, about, skills, tags, projects } = req.body;
    const developer = await DeveloperModel.findById(developerId);
    if (!developer) {
      return res.status(404).json({ message: "Developer profile not found" });
    }

    if (developerName !== undefined) developer.developerName = developerName;
    if (education !== undefined) developer.education = education;
    if (location !== undefined) developer.location = location;
    if (about !== undefined) developer.about = about;
    if (skills !== undefined) developer.skills = skills;
    if (tags !== undefined) developer.tags = tags;
    if (projects !== undefined) developer.projects = projects;

    // Save the updated document
    const updatedDeveloper = await developer.save();

    res.json(
      new ApiResponse({
        data: updatedDeveloper,
        message: "profile update successfully",
      })
    );
  } catch (error) {
    console.log(error)
    res.json(new ApiResponse({ message: "Something went wrong" , status: "failed"}));
  }
});



module.exports = { addDeveloper , UpdateDeveloper};
