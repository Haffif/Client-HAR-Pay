const eclogin = JSON.parse(localStorage.getItem("eclogin"));

if (!eclogin) {
  window.location.href = "../home/home.html";
}

// helper function
const removeClass = (el) => {
  el.classList.value = "";
};

// setup header
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", `Bearer ${eclogin.jwt}`);

// get saldo
const saldo = document.getElementById("saldo");

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

// get element cek sisa token
const cekStatus = document.getElementById("cekStatus");
const cekBtn = document.getElementById("cekBtn");
const inputIdPelangganCek = document.getElementById("id_pelanggan_cek");

// setup cek sisa token content
const resultContentCek = document.createElement("div");
resultContentCek.setAttribute("role", "alert");

// go request cek sisa token
cekBtn.addEventListener("click", (e) => {
  e.preventDefault();

  var raw = JSON.stringify({
    idPelanggan: inputIdPelangganCek.value,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://harpay-api.herokuapp.com/transaksi/cekTokenListrik", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      removeClass(resultContentCek);

      if (result.data) {
        resultContentCek.classList.add("alert");
        resultContentCek.classList.add("alert-success");
        resultContentCek.innerText = `Sisa token: ${result.data.sisaToken}`;
      } else {
        resultContentCek.classList.add("alert");
        resultContentCek.classList.add("alert-danger");
        resultContentCek.innerText = "Something went wrong, please try again or check your id";
      }

      cekStatus.append(resultContentCek);
    })
    .catch((error) => console.log("error", error));
});

// get element beli token
const beliStatus = document.getElementById("beliStatus");
const inputIdPelangganBeli = document.getElementById("id_pelanggan_beli");
const radioNominal = document.querySelectorAll('input[name="nominal"]');
let selectedNominal = null;
const inputPin = document.getElementById("pin");
const beliBtn = document.getElementById("beliBtn");

// setup cek beli token content
const resultContentBeli = document.createElement("div");
resultContentBeli.setAttribute("role", "alert");

// go request beli
beliBtn.addEventListener("click", (e) => {
  e.preventDefault();

  for (const sNom of radioNominal) {
    if (sNom.checked) {
      selectedNominal = sNom.value;
      selectedNominal = parseInt(selectedNominal);
      break;
    }
  }

  var raw = JSON.stringify({
    idPelanggan: inputIdPelangganBeli.value,
    nominal: selectedNominal,
    pin: inputPin.value,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://harpay-api.herokuapp.com/transaksi/pembelianTokenListrik", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      removeClass(resultContentBeli);

      if (result.message === "Payment for token listrik is successfully") {
        resultContentBeli.classList.add("alert");
        resultContentBeli.classList.add("alert-success");
        resultContentBeli.innerText = result.message;
      } else if (result.message) {
        resultContentBeli.classList.add("alert");
        resultContentBeli.classList.add("alert-danger");
        resultContentBeli.innerText = result.message;
      } else {
        resultContentBeli.classList.add("alert");
        resultContentBeli.classList.add("alert-danger");
        resultContentBeli.innerText = "Something went wrong, please try again or check your id";
      }

      beliStatus.append(resultContentBeli);
    })
    .catch((error) => console.log("error", error));
});
