//external Lib  imports
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// define the storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // File upload folder
    const fileUploadFolder = "./src/uploads/" + file.fieldname + "/";

    if (!fs.existsSync("./src/uploads/")) {
      fs.mkdirSync(`./src/uploads/`);
    }

    if (!fs.existsSync(fileUploadFolder)) {
      fs.mkdirSync(`./src/uploads/${file.fieldname}`);
    }

    cb(null, fileUploadFolder);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();

    cb(null, fileName + fileExt);
  },
});

// preapre the final multer upload object
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000, // 1MB
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "avatar") {
      if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
      ) {
        cb(null, true);
      } else {
        cb(new Error("Only .jpg, .png or .jpeg format allowed!"));
      }
    } else if (file.fieldname === "doc") {
      if (
        file.mimetype === "application/pdf" ||
        file.mimetype ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        cb(null, true);
      } else {
        cb(new Error("Only .pdf .docx format allowed!"));
      }
    } else {
      cb(new Error("There was an unknown error!"));
    }
  },
});

module.exports = upload;
