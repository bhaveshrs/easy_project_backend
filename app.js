const express = require('express');
const dotenv = require("dotenv").config();


const { errorHandler, notFound } = require('./middelwares/error_middleware');
const { authRouter } = require('./routes/auth_route');
const { adminRouter } = require('./routes/admin_route');
const { dbConnect } = require('./config/db_connect');
const path = require('path');
const { userProjectRouter } = require('./routes/user_project_route');




const app = express()
dbConnect()



const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use("/api/user", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/project", userProjectRouter);
app.use(notFound);

app.use(errorHandler);




app.listen(port, () => console.log(`Example app listening on port ${port}!`))