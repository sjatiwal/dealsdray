const ApiFeatures = require("../utils/apiFeatures");
const catchAsyncError = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const Employee = require("../models/employeeModel");
const fs = require("fs");
const path = require("path");

// Create assets directory if it doesn't exist
const assetsDir = path.join(__dirname, "../public/assets");
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir);
}

//create Employee
exports.createEmployee = catchAsyncError(async (req, res, next) => {
  const { name, email, mobileNo, designation, gender, img, course } = req.body;

  const formatMatch = img.match(/^data:(image\/(?:png|jpeg));base64,/);

  if (!formatMatch) {
    return res.status(400).send("Invalid image format");
  }

  const imageFormat = formatMatch[1];

  // Validating image format
  if (imageFormat !== "image/png" && imageFormat !== "image/jpeg") {
    return res.status(400).send("Only PNG or JPEG images are allowed");
  }

  // Decode base64 image data
  const base64Data = img.replace(/^data:image\/\w+;base64,/, "");

  // Generate a unique filename or use any specific naming convention
  const filename = `${Date.now()}.${imageFormat.split("/")[1]}`;
  const filePath = path.join(assetsDir, filename);

  // Create employee record
  Employee.create({
    name,
    email,
    mobileNo,
    designation,
    gender,
    course,
    imgpath: filePath,
  })
    .then((employee) => {
      // Write file to disk after employee creation
      fs.writeFile(filePath, base64Data, "base64", function (err) {
        if (err) {
          console.error(err);
          res.status(500).send("Error saving image");
        } else {
          res.status(201).json({ success: true, employee });
        }
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error creating employee");
    });
});

// Get All Employee
exports.getAllEmployees = catchAsyncError(async (req, res) => {
  const { keyword } = req.query;

  if (keyword === "undefined") {
    let employees = await Employee.find();
    res.status(200).json({
      success: true,
      employees,
    });
  } else {
    let apiFeature = new ApiFeatures(Employee.find(), req.query).search();
    let employees = await apiFeature.query;
    res.status(200).json({
      success: true,
      employees,
    });
  }
});

// Get Employee Details
exports.getEmployeeDetails = catchAsyncError(async (req, res, next) => {
  const _id = req.params.id;
  const employee = await Employee.findById(_id);

  if (!employee) {
    return next(new ErrorHandler("Employee not Found", 404));
  }

  res.status(200).json({
    success: true,
    employee,
  });
});

// Delete Employee
exports.deleteEmployee = catchAsyncError(async (req, res, next) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    return next(new ErrorHandler("Product not Found", 404));
  }

  const imagePath = employee.imgpath;
  if (imagePath) {
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error deleting image:", err);
      } else {
        console.log("Image deleted successfully");
      }
    });
  }
  await Employee.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
    message: "Employee Deleted Successfully",
  });
});

// update Employee
exports.updateEmployee = catchAsyncError(async (req, res) => {
  const { name, email, mobileNo, designation, gender, course, img } = req.body;
  let employee = await Employee.findById(req.params.id);

  if (!employee) {
    return next(new ErrorHandler("Employee not Found", 404));
  }

  if (img === employee.imgpath) {
    employee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        mobileNo,
        designation,
        gender,
        course,
        imgpath: img,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
    res.status(201).json({ success: true, employee });
  } else {
    const formatMatch = img.match(/^data:(image\/(?:png|jpeg));base64,/);

    if (!formatMatch) {
      return res.status(400).send("Invalid image format");
    }

    const imageFormat = formatMatch[1];

    if (imageFormat !== "image/png" && imageFormat !== "image/jpeg") {
      return res.status(400).send("Only PNG or JPEG images are allowed");
    }

    const base64Data = img.replace(/^data:image\/\w+;base64,/, "");

    const filename = `${Date.now()}.${imageFormat.split("/")[1]}`;
    const filePath = path.join(assetsDir, filename);

    if (employee.imgpath) {
      fs.unlinkSync(employee.imgpath);
    }

    employee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        mobileNo,
        designation,
        gender,
        course,
        imgpath: filePath,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    // Write file to disk after employee creation

    fs.writeFile(filePath, base64Data, "base64", function (err) {
      if (err) {
        console.error(err);
        res.status(500).send("Error saving image");
      } else {
        res.status(201).json({ success: true, employee });
      }
    });
  }
});
