const fname = document.querySelector(".fname");
const lname = document.querySelector(".lname");
const adhar = document.querySelector(".adhar");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const image = document.querySelector(".image");
const role = document.querySelector("#dropdown1");
const signupBtn = document.querySelector("#signup");
console.log(signupBtn);

const submitBtn = async (e) => {
  e.preventDefault();

  const data = {
    fname: fname.value,
    lname: lname.value,
    adhar: adhar.value,
    email: email.value,
    password: password.value,
    image: image.value,
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
      window.location.href = "/dashboard.html";
    }
    console.log(res);
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

signupBtn.addEventListener("submit", submitBtn);
