const met4kantin = JSON.parse(localStorage.getItem("met4kantin"));
if (!met4kantin) {
  window.location.href = "../../home/home.html";
}

// helper function
const removeClass = (el) => {
  el.classList.value = "";
};

// setup headers
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${met4kantin.jwt}`);

// get saldo
const saldo = document.getElementById("saldo");

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

let idUser = null;

fetch("https://met4kantin.herokuapp.com/api/profile", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    // console.log(result.data.uid);
    idUser = result.data.uid;
    saldo.innerText = result.data.cash;
  })
  .catch((error) => console.log("error", error));

// get top up saldo
const jumlah = document.getElementById("jumlah");
const submit = document.getElementById("submit");
const resultEl = document.getElementById("result");

// setup result
const resultContent = document.createElement("div");
resultContent.setAttribute("role", "alert");

myHeaders.append("Content-Type", "application/json");

submit.addEventListener("click", (e) => {
  e.preventDefault();

  var raw = JSON.stringify({
    jumlah: jumlah.value,
  });

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://met4kantin.herokuapp.com/api/profile/" + idUser, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      removeClass(resultContent);

      if (result.message === "Topup berhasil") {
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
      }, 1500);
    })
    .catch((error) => console.log("error", error));
});
