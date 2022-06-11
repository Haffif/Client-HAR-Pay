localStorage.removeItem("eclogin");

// console.log("Reset password init");

// get element
const emailEl = document.getElementById("email");
const submitBtn = document.getElementById("submit");
const resultEl = document.getElementById("result");

// helper function
const removeClass = (el) => {
  el.classList.value = "";
};

// setup result content
const resultContent = document.createElement("div");
resultContent.setAttribute("role", "alert");

// setup header
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

// go request init reset password
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // console.log(emailEl.value);

  var raw = JSON.stringify({
    email: emailEl.value,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://harpay-api.herokuapp.com/auth/lupaPassword", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      removeClass(resultContent);

      if (result.message === "Pin confirmation is sending to your email") {
        resultContent.classList.add("alert");
        resultContent.classList.add("alert-success");
        resultContent.innerText = result.message;
      } else if (result.message) {
        resultContent.classList.add("alert");
        resultContent.classList.add("alert-danger");
        resultContent.innerText = result.message;
      } else {
        resultContent.classList.add("alert");
        resultContent.classList.add("alert-danger");
        resultContent.innerText = "Something went wrong, please try again or check your input";
      }

      resultEl.append(resultContent);
    })
    .catch((error) => console.log("error", error));
});
