//internal import
const Service = require("../models/ServiceModel");

//Create new chart
exports.CreateService = (req, res) => {
  const { serviceName, serviceDescription, serviceThumbnail, serviceCover } =
    req.body;

  const newService = {
    serviceName,
    serviceDescription,
    serviceThumbnail,
    serviceCover,
    user: req.id,
  };

  Service.create(newService, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status: "fail", data: err.message });
    } else {
      return res.status(201).json({ status: "success", data: data });
    }
  });
};

//Select all Services
exports.SelectAllService = (req, res) => {
  const projection = "-createdAt -updatedAt";

  Service.find({}, projection)
    .populate("user", "name userName _id")
    .exec()
    .then((data) => {
      if (data && data.length > 0) {
        return res.json({ status: "success", data: data });
      } else {
        return res
          .status(404)
          .json({ status: "fail", data: "Service not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ status: "fail", data: err.message });
    });
};

//Select a Service by id
exports.SelectSingleService = (req, res) => {
  const { ServiceId } = req.params;
  const projection = "-_id -createdAt -updatedAt";

  Service.find({ _id: ServiceId }, projection)
    .populate("user", "name userName _id")
    .exec()
    .then((data) => {
      if (data && data.length > 0) {
        return res.json({ status: "success", data: data });
      } else {
        return res
          .status(404)
          .json({ status: "fail", data: "Service not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ status: "fail", data: err.message });
    });
};

//Update a Service
exports.UpdatedService = (req, res) => {
  const { ServiceId } = req.params;
  const { serviceName, serviceDescription, serviceThumbnail, serviceCover } =
    req.body;

  const newService = {
    serviceName,
    serviceDescription,
    serviceThumbnail,
    serviceCover,
  };

  Service.findByIdAndUpdate(
    { _id: ServiceId },
    newService,
    { new: true },
    (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ status: "fail", data: err.message });
      } else {
        if (data) {
          return res.json({
            status: "success",
            data: "Service Update Successfull",
          });
        } else {
          return res
            .status(404)
            .json({ status: "fail", data: "Service not found" });
        }
      }
    },
  );
};

//Delete  a Service
exports.DeleteService = (req, res) => {
  const { ServiceId } = req.params;

  Service.findByIdAndDelete({ _id: ServiceId }, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status: "fail", data: err.message });
    } else {
      if (data) {
        return res.json({
          status: "success",
          data: "Service Delete Successfull",
        });
      } else {
        return res
          .status(404)
          .json({ status: "fail", data: "Service not found" });
      }
    }
  });
};
