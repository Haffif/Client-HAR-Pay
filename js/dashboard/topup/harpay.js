const eclogin = JSON.parse(localStorage.getItem("eclogin"));
if (!eclogin) {
  window.location.href = "../../home/home.html";
}

// helper function
const removeClass = (el) => {
  el.classList.value = "";
};

// get saldo
const saldo = document.getElementById("saldo");

var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${eclogin.jwt}`);

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

fetch("https://harpay-api.herokuapp.com/transaksi/cekSaldo", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    saldo.innerText = result.saldo;
  })
  .catch((error) => console.log("error", error));

// request top up saldo
const jumlahTopup = document.getElementById("jumlahTopup");
const submit = document.getElementById("submit");
const resultEl = document.getElementById("result");

const resultContent = document.createElement("div");
resultContent.setAttribute("role", "alert");

myHeaders.append("Content-Type", "application/json");

submit.addEventListener("click", (e) => {
  e.preventDefault();

  var raw = JSON.stringify({
    nominal: jumlahTopup.value,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://harpay-api.herokuapp.com/transaksi/topup", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      removeClass(resultContent);

      if (result.message === "Topup successfully!") {
        resultContent.classList.add("alert");
        resultContent.classList.add("alert-success");
        resultContent.innerText = result.message;
      } else {
        resultContent.classList.add("alert");
        resultContent.classList.add("alert-danger");
        resultContent.innerText = "Topup failed, something went wrong. Try again!";
      }

      resultEl.append(resultContent);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    })
    .catch((error) => console.log("error", error));
});
