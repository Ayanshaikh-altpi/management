const task = document.querySelector(".task");
const assignDate = document.querySelector(".assignDate");
const dueDate = document.querySelector(".dueDate");
const submitBtn = document.querySelector(".submit");
const managerMsg=document.querySelector(".mngMsg")

const userData = JSON.parse(localStorage.getItem('user'));
console.log(userData);
const nameUser=document.querySelector('.name')
nameUser.textContent=userData.fname

const submitData = async (e) => {
  e.preventDefault();
  const data = {
    task: task.value,
    managerMsg:managerMsg.value,
    assignDate: assignDate.value,
    dueDate: dueDate.value,
  };
  const id = location.href.split("?")[1].split("=")[1];
  console.log(data);
  try {
    const response = await fetch(`http://localhost:4000/assign?id=${id}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    console.log(res);
    location.href = `/frontend-mentor-management-client/dashboard.html`
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

submitBtn.addEventListener("click", submitData);
const logout=document.querySelector('.btn-danger')
logout.addEventListener('click',()=>{
  location.href=('http://127.0.0.1:5501/frontend-mentor-management-client/signIn.html')
})