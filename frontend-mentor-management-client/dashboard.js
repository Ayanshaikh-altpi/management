const nameUser=document.querySelector('.name')
window.onload = async () => {
  const userData = JSON.parse(localStorage.getItem('user'));
  nameUser.textContent= userData.fname;
  const res = await fetch("http://localhost:4000/tasks");
  const data = await res.json();
  console.log("this is data",data);
  const html = data.tasks.map((task,index) => {
  
    return `
      <tr ${task.idtasks}>
        <td>${index+1}</td>
        <td>${task.fname}</td>
        <td id="taskContent">${task.task}</td>
        <td>${task.employeeMsg}</td>
        <td class="edit" id=${task.idtasks}'><i class="fa-regular fa-pen-to-square"></i></td>
        <td class="save-btn"><i class="fa-solid fa-check"></i></td>
        <td>${
          !task.completed && !task.rejected
            ? "Pending"
            : task.completed
            ? "Completed"
            : task.rejected
            ? "Accept"
            :"Pending"
        }</td>
      </tr>
    `;
  });
  document.querySelector("tbody").insertAdjacentHTML("afterend", html);
 

const editBtn = document.querySelectorAll('.edit');
  const saveButton = document.querySelectorAll(".save-btn");

  editBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const currElement = btn.parentElement;
      const taskContentElement = currElement.querySelector("#taskContent");

      if (taskContentElement) {
        taskContentElement.setAttribute("contenteditable", "true");
        taskContentElement.focus();

        saveButton.forEach((savebtn,index) => {
          console.log(index);
          savebtn.addEventListener('click', async () => {
            const updatedContent = taskContentElement.textContent;
            console.log(updatedContent);
            const data={
              task: updatedContent
            }
            await fetch(`http://localhost:4000/update/${index+1}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });
          });
        });
      }
    });
  });


}  
const btnDash=document.querySelector(".btn-dash")

btnDash.addEventListener('click',function(){
  location.href='/frontend-mentor-management-client/dashboardUser.html'
})
const logout=document.querySelector('.btn-danger')
logout.addEventListener('click',()=>{
  location.href=('http://127.0.0.1:5501/frontend-mentor-management-client/signIn.html')
})