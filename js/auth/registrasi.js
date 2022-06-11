localStorage.removeItem("eclogin");

const nama = document.getElementById("nama");
const email = document.getElementById("email");
const noTelp = document.getElementById("noTelp");
const password = document.getElementById("password");
const konfirmasiPassword = document.getElementById("konfirmasiPassword");
const pin = document.getElementById("pin");
const konfirmasiPin = document.getElementById("konfirmasiPin");

const buttonSubmit = document.getElementById("submit");
const resultEl = document.getElementById("result");

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const resultContent = document.createElement("div");
resultContent.setAttribute("role", "alert");

const removeClass = (el) => {
  el.classList.value = "";
};

buttonSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  var raw = JSON.stringify({
    name: nama.value,
    email: email.value,
    noTelp: noTelp.value,
    password: password.value,
    konfirmasiPassword: konfirmasiPassword.value,
    pin: pin.value,
    konfirmasiPin: konfirmasiPin.value,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://harpay-api.herokuapp.com/auth/registrasi", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      removeClass(resultContent);

      if (result.message && result.message === "User created") {
        resultContent.classList.add("alert");
        resultContent.classList.add("alert-success");
        resultContent.innerText = result.message;

        setTimeout(() => {
          window.location.href = "./login.html";
        }, 1000);
      } else {
        resultContent.classList.add("alert");
        resultContent.classList.add("alert-danger");
        resultContent.innerText = "Failed to create an account";
      }

      resultEl.append(resultContent);

      document.body.scrollTop = 0; // safari
      document.documentElement.scrollTop = 0; // chrome
    })
    .catch((error) => console.log("error", error));
});
