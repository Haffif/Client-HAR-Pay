localStorage.removeItem("eclogin");
localStorage.removeItem("met4kantin");
localStorage.removeItem("edoeit");

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

const harpayLoginUrl = "https://harpay-api.herokuapp.com/auth/login";
const met4kantinLoginUrl = "https://met4kantin.herokuapp.com/api/login";
const e_doeitLoginUrl = "https://e-doeit.herokuapp.com/api/login";

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

  fetch(harpayLoginUrl, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      removeClass(resultContent);

      if (result.message === "Auth failed") {
        resultContent.classList.add("alert");
        resultContent.classList.add("alert-danger");
        resultContent.innerText = result.message;
      } else if (result.message === "Auth success") {
        localStorage.setItem("eclogin", JSON.stringify({ jwt: result.token }));

        // setup new body for other requests
        requestOptions.body = JSON.stringify({
          email: email.value,
          pass: password.value,
        });

        fetch(met4kantinLoginUrl, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result.status === 200) {
              resultContent.classList.add("alert");
              resultContent.classList.add("alert-success");
              resultContent.innerText = "Berhasil login untuk harpay dan met4kantin";

              localStorage.setItem("eclogin", JSON.stringify({ jwt: result.jwt }));
              setTimeout(() => {
                window.location.href = "../dashboard/dashboard.html";
              }, 1000);
            } else {
              resultContent.classList.add("alert");
              resultContent.classList.add("alert-danger");
              resultContent.innerText = "Gagal login untuk met4kantin";
            }
          })
          .catch((err) => console.log(err));
      }

      resultEl.append(resultContent);
    })
    .catch((error) => console.log("error", error));
});
