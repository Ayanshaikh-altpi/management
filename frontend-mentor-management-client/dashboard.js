
window.onload = async () => {
  const res = await fetch("http://localhost:4000/tasks");
  const data = await res.json();
  console.log(data);
  const html = data.tasks.map((task) => {
    return `
      <tr>
        <td>${task.idtasks}</td>
        <td>${task.task}</td>
        <td>${task.fname}</td>
        <td>${
          !task.completed && !task.rejected
            ? "Pending"
            : task.completed
            ? "Completed"
            : task.rejected
            ? "Rejected"
            :"Pending"
      
        }</td>
      </tr>
    `;
  });

  document.querySelector("tbody").insertAdjacentHTML("afterend", html);
};
