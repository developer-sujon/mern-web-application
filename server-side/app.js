//external Lib  imports
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const ErrorHandler = require("./src/middleware/ErrorHandler");
const path = require("path");
const app = new express();

dotenv.config({ path: path.join(__dirname, "./.env") });

//internal imports
const ConnectDB = require("./src/config/ConnectDB");
const CheckLogin = require("./src/middleware/CheckLogin");

//imports routes
const ChartRoutes = require("./src/routes/ChartRoutes");
const ContactRoutes = require("./src/routes/ContactRoutes");
const CourcesRoutes = require("./src/routes/CourcesRoutes");
const PortfolioRoutes = require("./src/routes/PortfolioRoutes");
const ServiceRoutes = require("./src/routes/ServiceRoutes");
const TestmonialRoutes = require("./src/routes/TestmonialRoutes");
const FooterRoutes = require("./src/routes/FooterRoutes");
const InformationRoutes = require("./src/routes/InpormationRoutes");
const HomeEtcRoutes = require("./src/routes/HomeEtcRoutes");
const ProfileRoutes = require("./src/routes/auth/ProfileRoutes");

//security lib imports
const cors = require("cors");
const hpp = require("hpp");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const expressMongoSanitize = require("express-mongo-sanitize");
const xssClean = require("xss-clean");

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

app.use("/api/v1/Chart", ChartRoutes);
app.use("/api/v1/Contact", ContactRoutes);
app.use("/api/v1/Course", CourcesRoutes);
app.use("/api/v1/Portfolio", PortfolioRoutes);
app.use("/api/v1/Service", ServiceRoutes);
app.use("/api/v1/Testmonial", TestmonialRoutes);
app.use("/api/v1/Footer", FooterRoutes);
app.use("/api/v1/Information", InformationRoutes);
app.use("/api/v1/HomeEtc", HomeEtcRoutes);
app.use("/api/v1/User", ProfileRoutes);

// Add React Front End Routing
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// 404 not found handler
app.use(ErrorHandler.notFoundErrorHandler);

// Default Error Handler
app.use(ErrorHandler.defaultErrorHandler);

module.exports = app;
