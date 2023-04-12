import { Router } from "express";
import {
  addEmployee,
  deleteEmployee,
  getEmployee,
  getEmployeeList,
  updateEmployee,
} from "../controllers/employeeController.js";

const router = Router();

router.route("/").get(getEmployeeList);
router.route("/").post(addEmployee);
router.route("/:id").get(getEmployee);
router.route("/:id").patch(updateEmployee);
router.route("/:id").delete(deleteEmployee);

export default router;
