
window.onload = async () => {
  const res = await fetch("http://localhost:4000/tasks");
  const data = await res.json();
  console.log("this is data",data);
  const html = data.tasks.map((task,index) => {
  
    return `
      <tr ${task.idtasks}>
        <td>${task.idtasks}</td>
        <td id="taskContent">${task.task}</td>
        <td class="edit" id=${task.idtasks}'><i class="fa-regular fa-pen-to-square"></i></td>
        <td class="save-btn"><i class="fa-solid fa-check"></i></td>
        <td>${task.fname}</td>
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

  editBtn.forEach((btn) =>
  btn.addEventListener("click", () => {
    const currElement = document.getElementById(`${btn.id}`)
    console.log(currElement);
    if (currElement) {
      console.log(currElement);
currElement.previousElementSibling.setAttribute("contenteditable", "true")
currElement.previousElementSibling.focus()

      const saveButton = document.querySelectorAll(".save-btn");
      console.log(saveButton); 
      saveButton.forEach((savebtn)=>{
        console.log('adhgsafhkashfjk')
        savebtn.addEventListener('click',async ()=>{
          const updatedContent = editableElement.textContent;
          await fetch(`http://localhost:4000/update/${id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ content: updatedContent }),
            })
          console.log("djhf");
        })
      })
    }
      
     
      // updatedRow = {
      //   task: currElement.querySelector("td:nth-child(1)").textContent,
       
      // };
      // task.defaultValue = updatedRow.task;
      // if (saveButton) {
      //   saveButton.removeAttribute("disabled");
      //   saveButton.addEventListener("click", function () {
      //     console.log("isd");
      //     const newUpdatedRow = {
      //       id: task.id,
      //       task: task.value,
      //     };
      //     fetch(`http://localhost:4000/update/${newUpdatedRow.id}`, {
      //       method: "PUT",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify(newUpdatedRow),
      //     })
          //   .then((response) => {
          //     if (response.ok) {
          //       console.log("PUT request was successful");
          //     } else {
          //       console.error("PUT request failed");
          //     }
          //     editable = false;
          //     location.reload();
          //   })
          //   .catch((error) => {
          //     console.error("Network error:", error.message);
          //   });
        })
        )
    }  
const btnDash=document.querySelector(".btn-dash")

btnDash.addEventListener('click',function(){
  location.href='/frontend-mentor-management-client/dashboardUser.html'
})