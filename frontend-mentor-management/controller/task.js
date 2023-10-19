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
  const { task, assignDate, dueDate } = req.body;
  const userId = req.query.id;

  await connect.query(
    "INSERT INTO tasks (task, assignDate, dueDate, idusers) VALUE (?, ?, ?, ?)",
    [task, assignDate, dueDate, userId]
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
  console.log(idtasks);
  const { task, assignDate, dueDate } = req.body;

  const sql = "UPDATE tasks SET task=?, assignDate=?, dueDate=? WHERE idtasks=?";
  const values = [task, assignDate, dueDate, idtasks];

  connect.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error Updating Assigned Task", err);
      return res.status(500).json({ error: "Error Updating Assigned Task" });
    }
    console.log('2');
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    console.log('3');
    res.status(200).json({ message: 'Task updated successfully' });
  });
};



module.exports = {
  getAllTask,
  assignTask,
  increaseTaskDate,
  sendNotification,
  completeTask,
  rejectTask,
  updateTask
};
