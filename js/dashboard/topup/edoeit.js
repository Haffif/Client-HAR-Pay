const edoeit = JSON.parse(localStorage.getItem("edoeit"));
if (!edoeit) {
  window.location.href = "../../home/home.html";
}

// helper function
const removeClass = (el) => {
  el.classList.value = "";
};

// setup headers
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${edoeit.jwt}`);

// get saldo
const saldo = document.getElementById("saldo");

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

fetch("https://e-doeit.herokuapp.com/api/profile", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    saldo.innerText = result.saldo;
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
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://e-doeit.herokuapp.com/api/topup", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      removeClass(resultContent);

      if (result.message === "Top Up Berhasil") {
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
