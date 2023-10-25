const express = require("express");
const {
  employeeMsg,
  assignTask,
  increaseTaskDate,
  completeTask,
  rejectTask,
  getAllTask,
  sendNotification,
  updateTask
} = require("../controller/task");
const router = express.Router();

router.get("/tasks", getAllTask);
router.post("/assign", assignTask);
router.put("/increase/:id", increaseTaskDate);
router.post("/notify/:id",sendNotification);
router.put("/complete", completeTask);
router.put("/reject", rejectTask);
router.put('/update/:id',updateTask)
router.post('/empMessage',employeeMsg)

module.exports = router;
