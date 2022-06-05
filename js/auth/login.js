const email = document.getElementById("email");
const password = document.getElementById("password");
const submitBtn = document.getElementById("submit");
const resultEl = document.getElementById("result");

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const resultContent = document.createElement("div");
resultContent.setAttribute("role", "alert");

const removeClass = (el) => {
  el.classList.value = "";
};

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  var raw = JSON.stringify({
    email: email.value,
    password: password.value,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://harpay-api.herokuapp.com/auth/login", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      removeClass(resultContent);
      if (result.message === "Auth failed") {
        resultContent.classList.add("alert");
        resultContent.classList.add("alert-danger");
        resultContent.innerText = result.message;
      } else if (result.message === "Auth success") {
        resultContent.classList.add("alert");
        resultContent.classList.add("alert-success");
        resultContent.innerText = result.message;

        localStorage.setItem("eclogin", JSON.stringify({ jwt: result.token }));

        window.location.href = "../dashboard/dashboard.html";
      }

      resultEl.append(resultContent);
    })
    .catch((error) => console.log("error", error));
});
