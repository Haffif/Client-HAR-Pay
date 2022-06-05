const eclogin = JSON.parse(localStorage.getItem("eclogin"));
if (!eclogin) {
  window.location.href = "../home/home.html";
}

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
