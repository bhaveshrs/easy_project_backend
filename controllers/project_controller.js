const expressAsyncHandler = require("express-async-handler");
const UserProject = require("../models/project_model");
const User = require("../models/user_model");
const ApiResponse = require("../config/common_response");

const addUserProject = expressAsyncHandler(async (req, res) => {
  const userProjectData = UserProject(req.body);
  // const {id } = req.params;
  console.log(userProjectData);
  try {
    const user = await User.findById(userProjectData.userId);
    if (!user) {
      return res.json(new ApiResponse({ message: "User not found" }));
    } else {
      const savedProject = await userProjectData.save();
      user.projects.push(savedProject._id);
      console.log(user);
      await user.save();
      return res.json(
        new ApiResponse({
          message: "Project added successfully",
          data: savedProject,
        })
      );
    }
  } catch (error) {
    console.log(error);

    return res.json(
      new ApiResponse({ message: "something went wrong", status: "failed" })
    );
  }
});

const showUserProject = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const existedUser = await User.findById(id);

    if (!existedUser) {
      return res.json(new ApiResponse({ message: "User not found" }));
    }
    const projects = await UserProject.find({ userId: id });
    res.json(
      new ApiResponse({
        data: projects,
        message: "projects fetched successfully",
      })
    );
  } catch (error) {
    console.log(error);
    res.json(new ApiResponse({ message: "Something went wrong" }));
  }
});



module.exports = { addUserProject, showUserProject };
