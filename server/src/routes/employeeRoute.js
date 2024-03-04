const express = require("express");

const router = express.Router();
const {
  createEmployee,
  getAllEmployees,
  getEmployeeDetails,
  deleteEmployee,
  updateEmployee,
} = require("../controllers/employeeController");
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/employee/new").post(isAuthenticatedUser, createEmployee);
router.route("/employees").get(isAuthenticatedUser, getAllEmployees);
router
  .route("/employee/:id")
  .get(isAuthenticatedUser, getEmployeeDetails)
  .delete(isAuthenticatedUser, deleteEmployee)
  .put(isAuthenticatedUser, updateEmployee);
module.exports = router;
