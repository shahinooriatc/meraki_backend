const express = require("express");
const app = express();
const cors = require('cors')
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config();

app.use(cors());
app.use(express.json());

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
    next();
});

app.use('/uploads', express.static('uploads'));

// Database Connection
const db = require("./models");
db.connectDatabase()
    .then(() => console.log("Database connected!"))
    .catch((err) => console.log("Database connection failed! " + err.toString()));

// Define default data
const SettingController = require('./controllers/setting.controller');
SettingController.createDefaultSetting();

const DepartmentController = require('./controllers/department.controller');
DepartmentController.createDefaultDepartments();

const DesignationController = require('./controllers/designation.controller');
DesignationController.createDefaultDesignations();

const UserController = require("./controllers/user.controller");
UserController.createDefaultUsers();

// Public routes
require("./routes/auth.route")(app);

// Private routes
app.use("/api*", require('./middlewares/auth.middleware'));

require("./routes/department.route")(app);
require("./routes/designation.route")(app);
require("./routes/user.route")(app);
require("./routes/attendance.route")(app);
require("./routes/expenses.route")(app);
require("./routes/leave.route")(app);
require("./routes/setting.route")(app);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Backend server is running on ${port}!`);
});