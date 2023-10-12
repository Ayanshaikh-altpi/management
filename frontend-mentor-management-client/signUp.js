const fname = document.querySelector(".fname");
const lname = document.querySelector(".lname");
const adhar = document.querySelector(".adhar");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const image = document.querySelector(".image");
const role = document.querySelector("#dropdown1");
const signupBtn = document.querySelector("#signup");
const msg = document.querySelector('.msg');

let imageAsBase64 = ''

const convertBase64 = (e) => {
  console.log(e.target.files[0]);
  const reader = new FileReader()
  reader.readAsDataURL(e.target.files[0])
  reader.onload = () => {
    imageAsBase64 = reader.result
    console.log(reader.result);
    console.log(imageAsBase64);
  }
  reader.onerror = () => {
    console.log('Something went wrong!');
  }
}

const submitBtn = async (e) => {
  e.preventDefault();

  const data = {
    fname: fname.value,
    lname: lname.value,
    adhar: adhar.value,
    email: email.value,
    password: password.value,
    image: imageAsBase64,
    role: role.value,
  };
  console.log(data);
  try {
    const response = await fetch("http://localhost:4000/signup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();

    if (res.ok) {
      window.location.href = "/frontend-mentor-management-client/signIn.html";
    }
    console.log(res);
    msg.textContent = res.message
  } catch (error) {
    console.error("An error occurred:", error);
  }
};


signupBtn.addEventListener("submit", submitBtn);

