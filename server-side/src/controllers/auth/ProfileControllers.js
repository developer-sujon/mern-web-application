//external import
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//internal imports
const Profile = require("../../models/auth/ProfileModel");

exports.RegistarProfile = (req, res) => {
  const { name, email, phone, password, userName, avatar, birthday, cv } =
    req.body;

  const query = {
    $or: [{ email: email }, { phone: phone }, { userName: userName }],
  };

  Profile.find(query, (err, data) => {
    if (data && data.length > 0) {
      res.status(500).json({
        status: "fail",
        data: "This Email Or Phone Or User Name Allready Use",
      });
    } else {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          if (err) {
            res.status(500).json({ status: "fail", data: err.message });
          } else {
            const newUser = {
              name,
              email,
              phone,
              userName,
              password: hash,
              avatar,
              birthday,
              cv,
            };

            Profile.create(newUser, (err, data) => {
              if (err) {
                res.status(500).json({ status: "fail", data: err.message });
              } else {
                res.status(201).json({ status: "success", data: data });
              }
            });
          }
        });
      });
    }
  });
};

exports.SelectProfile = (req, res) => {
  const Projection = "name  email phone userName";
  Profile.find({}, Projection, (err, data) => {
    if (err) {
      res.status(500).json({ status: "fail", data: err.message });
    } else {
      if (data && data.length > 0) {
        res.status(200).json({ status: "success", data: data });
      } else {
        res.status(404).json({ status: "fail", data: "user not found" });
      }
    }
  });
};

exports.LoginProfile = (req, res) => {
  const { email, phone, userName, password } = req.body;

  const query = {
    $or: [{ email: email }, { phone: phone }, { userName: userName }],
  };

  Profile.find(query, (err, data) => {
    if (err) {
      res.status(500).json({ status: "fail", data: err.message });
    } else {
      if (data && data.length > 0) {
        bcrypt.compare(password, data[0].password).then((result) => {
          if (result) {
            const secretKey = process.env.JWT_SECRET_KEY;
            const payload = {
              id: data[0]._id,
              userName: data[0].userName,
            };
            // Generate the token
            const token = jwt.sign(payload, secretKey, { expiresIn: "24h" });
            res.status(200).json({ status: "success", token: token });
          } else {
            res
              .status(401)
              .json({ status: "fail", data: "authorization Credential" });
          }
        });
      } else {
        res
          .status(401)
          .json({ status: "fail", data: "authorization Credential" });
      }
    }
  });
};

//changePassword
exports.changePassword = (req, res) => {
  const { previousPassword, newPassword } = req.body;
  const ejectingUser = Profile.aggregate(
    [
      {
        $match: {
          userName: req.userName,
        },
      },
    ],
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "there was server side error" });
      } else {
        if (data && data.length > 0) {
          bcrypt.compare(previousPassword, data[0].password, (err, result) => {
            if (result) {
              bcrypt.hash(newPassword, 10, (err, hash) => {
                if (err) {
                  console.log(err);
                  res
                    .status(500)
                    .json({ message: "there was server side error" });
                } else {
                  Profile.findByIdAndUpdate(
                    { _id: req.id },
                    { password: hash },
                    { new: true },
                    (err, data) => {
                      if (err) {
                        console.log(err);
                        res.status(500).json({
                          message: "there was server side error",
                        });
                      } else {
                        res.json({ message: "Password Change Success" });
                      }
                    },
                  );
                }
              });
            } else {
              res.status(400).json({ message: "Incorrect Password " });
            }
          });
        } else {
          res.status(401).json({ message: "unauthorized credential" });
        }
      }
    },
  );
};
