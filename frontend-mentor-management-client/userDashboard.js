const msg = document.querySelector('.msg')
const nameUser = document.querySelector('.nameUser')
const nav = document.querySelector('.nav')
const image = document.querySelector('img')

const labelImage = document.querySelector('.avatar')
console.log(labelImage);

window.onload = async () => {
  const id = location.href.split("?")[1].split("=")[1];
  const res = await fetch(`http://localhost:4000/user-tasks?id=${id}`);
  const tasks = await res.json();
  labelImage.setAttribute('src', 'data:image/jpeg;base64,' + tasks.tasks[0].image.split(',')[1]) 

  const html = tasks.tasks.map((task, index) => {
    nameUser.textContent = task.lname;
   
    return `
                <tr>
                <td>${index + 1}</td>
                <td>${task.fname}</td>
                <td>${task.task}</td>
                <td>
                <button class="btn btn-primary btn-complete" data-user='${JSON.stringify(
      task
    )}'>Complete</button>
                  <button class="btn btn-secondary btn-reject" data-user='${JSON.stringify(task)
      }'>Accept</button>
                  </td>
                  <td>${task.dueDate}</td>
                </tr>
            `;
  });
  document.querySelector("tbody").insertAdjacentHTML("afterend", html);


  const completeBtn = document.querySelectorAll(".btn-complete");
  const rejectBtn = document.querySelectorAll(".btn-reject");
  completeBtn.forEach((btn) => {
    btn.addEventListener("click", async function () {
      const user = JSON.parse(btn.getAttribute("data-user"));
      const reqBody = { userId: user.idusers, taskId: user.idtasks }
      const res = await fetch("http://localhost:4000/complete", {
        method: "PUT",
        body: JSON.stringify(reqBody),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log(data);

      // location.href = `/frontend-mentor-management-client/dashboard.html`;
      msg.textContent = data.message

    });
  });

  rejectBtn.forEach((btn) => {
    btn.addEventListener("click", async function () {
      const user = JSON.parse(btn.getAttribute("data-user"));
      console.log(user);
      const reqBody = { userId: user.idusers, taskId: user.idtasks }
      const res = await fetch("http://localhost:4000/reject", {
        method: "PUT",
        body: JSON.stringify(reqBody),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log(data);
      // location.href = `/frontend-mentor-management-client/dashboard.html`;
      msg.textContent = data.message

    });
  });

  

};

