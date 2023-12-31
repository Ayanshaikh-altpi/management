const connect = require("../config/db");

const getAllTask = async (req, res) => {
  try {
    const [allTasks] = await connect.query(
      "SELECT * FROM tasks INNER JOIN users ON tasks.idusers = users.idusers"
    );
    res.status(200).json({ tasks: allTasks });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const assignTask = async (req, res) => {
  const { task, managerMsg, assignDate, dueDate } = req.body;
  const userId = req.query.id;

  await connect.query(
    "INSERT INTO tasks (task, managerMsg, assignDate, dueDate, idusers) VALUE ( ?, ?, ?, ?, ? )",
    [task, managerMsg, assignDate, dueDate, userId]
  );

  if (!userId) {
    return res.status(404).json({ message: "No user found" });
  }

  res.status(200).json({ message: "Task Created" });
  try {
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const increaseTaskDate = async (req, res) => {
  try {
    await connect.query(
      "UPDATE tasks SET dueDate = ? WHERE idusers = ? AND idtasks = ?",
      [req.params.id, req.body.id]
    );

    if (!req.params.id || !req.body.id) {
      return res.status(400).json({ message: "Not Found" });
    }
    res.status(200).json({ message: "Due date Extended" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const sendNotification = async (req, res) => {
  const [[task]] = await connect.query(
    "SELECT * FROM tasks WHERE idusers = ? AND idtasks = ?",
    [req.params.id, req.body.id]
  );
  if (task.assignDate >= task.dueDate) {
    return res
      .status(200)
      .json({ message: "You've not completed The Task Assigned!" });
  }
};

const completeTask = async (req, res) => {
  try {
    const { userId, taskId } = req.body;

    await connect.query(
      "UPDATE tasks SET completed = ? WHERE idusers = ? AND idtasks = ?",
      [true, userId, taskId]
    );
    if (!userId) {
      return res.status(404).json({ message: "No user found" });
    }
    res.status(200).json({ message: "Task completed" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const rejectTask = async (req, res) => {
  try {
    const { userId, taskId } = req.body;

    await connect.query(
      "UPDATE tasks SET rejected = ? WHERE idusers = ? AND idtasks = ?",
      [true, userId, taskId]
    );
    if (!userId) {
      return res.status(404).json({ message: "No user found" });
    }
    res.status(200).json({ message: "Task Accept" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const updateTask = async (req, res) => {
  const idtasks = req.params.id;
  const { task, assignDate, dueDate } = req.body;
  if (!task && !assignDate && !dueDate) {
    return res.json({ message: "Task cannot be updated" })
  }
  const response = await connect.query("UPDATE tasks SET task=?, assignDate=?, dueDate=? WHERE idtasks=?", [task, assignDate, dueDate, idtasks])
  console.log(response);
  res.status(200).json({ message: 'Task Updated successfully' })
};

const employeeMsg = async (req, res) => {
  const { employeeMsg } = req.body
  await connect.query("UPDATE tasks SET employeeMsg = ? WHERE idtasks = ?", [employeeMsg, req.params.id]);

  if (!employeeMsg) {
    return res.json({ message: "No Comment" })
  }
  res.status(200).json({ message: 'Message send' })
}


module.exports = {
  employeeMsg,
  getAllTask,
  assignTask,
  increaseTaskDate,
  sendNotification,
  completeTask,
  rejectTask,
  updateTask
};
