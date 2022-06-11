const eclogin = JSON.parse(localStorage.getItem("eclogin"));

if (!eclogin) {
  window.location.href = "../home/home.html";
}

// get element
const noTelpEl = document.getElementById("notelp");
const nominalEl = document.getElementById("nominal");
const pinEl = document.getElementById("pin");
const submitBtn = document.getElementById("submit");

// setup header
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${eclogin.jwt}`);
myHeaders.append("Content-Type", "application/json");

// setup result
const resultEl = document.getElementById("result");
const resultContent = document.createElement("div");
resultContent.setAttribute("role", "alert");

// helper function
const removeClass = (el) => {
  el.classList.value = "";
};

// do request topup
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  var raw = JSON.stringify({
    noTelp: noTelpEl.value,
    nominal: nominalEl.value,
    pin: pinEl.value,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://harpay-api.herokuapp.com/transaksi/transferSaldo", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      removeClass(resultContent);

      if (result.message === "Successfully payment for transfer saldo") {
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
