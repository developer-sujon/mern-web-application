//external Lib  imports
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const ErrorHandler = require("./src/middleware/ErrorHandler");
const path = require("path");
const app = new express();

dotenv.config();

//internal imports
const ConnectDB = require("./src/config/ConnectDB");
const CheckLogin = require("./src/middleware/CheckLogin");

//imports routes
const Chartroutes = require("./src/routes/Chartroutes");
const Contactroutes = require("./src/routes/Contactroutes");
const Courcesroutes = require("./src/routes/Courcesroutes");
const Portfolioroutes = require("./src/routes/Portfolioroutes");
const Serviceroutes = require("./src/routes/Serviceroutes");
const Testmonialroutes = require("./src/routes/Testmonialroutes");
const Footerroutes = require("./src/routes/Footerroutes");
const Informationroutes = require("./src/routes/Inpormationroutes");
const HomeEtcroutes = require("./src/routes/HomeEtcroutes");
const Profileroutes = require("./src/routes/auth/Profileroutes");

//security lib imports
const cors = require("cors");
const hpp = require("hpp");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const expressMongoSanitize = require("express-mongo-sanitize");
const xssClean = require("xss-clean");
const {
  DashboardControllers,
} = require("./src/controllers/DashboardControllers");

//security middleware emplement
app.use(cors());
app.use(hpp());
app.use(helmet());
app.use(expressMongoSanitize());
app.use(xssClean());

//default middleware emplement
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Apply the rate limiting middleware to all requests

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10000,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

const MONGODB_CONNECTION_URL = process.env.MONGODB_CONNECTION_URL;
const DB_OPTIONS = {
  user: process.env.MONGODB_DATABASE_USERNAME,
  pass: process.env.MONGODB_DATABASE_PASSWORD,
  dbName: "portfolio",
  autoIndex: true,
};

//connection database
ConnectDB(MONGODB_CONNECTION_URL, DB_OPTIONS);
app.use(express.static("client/build"));

// Routing Implement

app.use("/api/v1/Chart", Chartroutes);
app.use("/api/v1/Contact", Contactroutes);
app.use("/api/v1/Course", Courcesroutes);
app.use("/api/v1/Portfolio", Portfolioroutes);
app.use("/api/v1/Service", Serviceroutes);
app.use("/api/v1/Testmonial", Testmonialroutes);
app.use("/api/v1/Footer", Footerroutes);
app.use("/api/v1/Information", Informationroutes);
app.use("/api/v1/HomeEtc", HomeEtcroutes);
app.use("/api/v1/User", Profileroutes);
app.get("/api/v1/DashboardSummary", DashboardControllers);

// Add React Front End Routing
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// 404 not found handler
app.use(ErrorHandler.notFoundErrorHandler);

// Default Error Handler
app.use((err, req, res, next) => {
  const message = err.message ?? "Server Error Occured";
  const status = err.status ?? 500;
  res.status(status).json({ message });
});

module.exports = app;
