//internal import
const Contact = require("../models/ContactModel");

//Create new chart
exports.CreateContact = (req, res) => {
  const { contactName, contactEmail, contactMessage } = req.body;
  const newContact = { contactName, contactEmail, contactMessage };

  Contact.create(newContact, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status: "fail", data: err.message });
    } else {
      return res.status(201).json({ status: "success", data: data });
    }
  });
};

//Select all contacts
exports.SelectAllContact = (req, res) => {
  const projection = "-createdAt -updatedAt";

  Contact.find({}, projection, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status: "fail", data: err.message });
    } else {
      if (data && data.length > 0) {
        return res.json({ status: "success", data: data });
      } else {
        return res
          .status(404)
          .json({ status: "fail", data: "Contact not found" });
      }
    }
  });
};

//Select a contact by id
exports.SelectSingleContact = (req, res) => {
  const { ContactId } = req.params;
  const projection = "-_id -createdAt -updatedAt";

  Contact.find({ _id: ContactId }, projection)
    .populate("user", "name userName _id")
    .exec()
    .then((data) => {
      if (data && data.length > 0) {
        return res.json({ status: "success", data: data });
      } else {
        return res
          .status(404)
          .json({ status: "fail", data: "Contact not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ status: "fail", data: err.message });
    });
};

//Update a contact
exports.UpdatedContact = (req, res) => {
  const { ContactId } = req.params;
  const { contactName, contactEmail, contactMessage } = req.body;
  const newContact = { contactName, contactEmail, contactMessage };

  Contact.findByIdAndUpdate(
    { _id: ContactId },
    newContact,
    { new: true },
    (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ status: "fail", data: err.message });
      } else {
        if (data) {
          return res.json({
            status: "success",
            data: "Contact Update Successfull",
          });
        } else {
          return res
            .status(404)
            .json({ status: "fail", data: "Contact not found" });
        }
      }
    },
  );
};

//Delete  a contact
exports.DeleteContact = (req, res) => {
  const { ContactId } = req.params;

  Contact.findByIdAndDelete({ _id: ContactId }, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status: "fail", data: err.message });
    } else {
      if (data) {
        return res.json({
          status: "success",
          data: "Contact Delete Successfull",
        });
      } else {
        return res
          .status(404)
          .json({ status: "fail", data: "Contact not found" });
      }
    }
  });
};
