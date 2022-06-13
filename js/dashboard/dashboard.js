const eclogin = JSON.parse(localStorage.getItem("eclogin"));
if (!eclogin) {
  window.location.href = "../home/home.html";
}

const met4kantin = JSON.parse(localStorage.getItem("met4kantin"));
if (!met4kantin) {
  window.location.href = "../home/home.html";
}

const edoeit = JSON.parse(localStorage.getItem("edoeit"));
if (!edoeit) {
  window.location.href = "../home/home.html";
}

const peepay = JSON.parse(localStorage.getItem("peepay"));
if (!peepay) {
  window.location.href = "../home/home.html";
}

const saldo = document.getElementById("saldo");
const saldoMet4kantin = document.getElementById("saldomet4");
const saldoEdoeit = document.getElementById("saldoedoeit");
const saldoPeepay = document.getElementById("saldopeepay");

var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${eclogin.jwt}`);

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

const harpayCekSaldoUrl = "https://harpay-api.herokuapp.com/transaksi/cekSaldo";
const met4kantinCekSaldoUrl = "https://met4kantin.herokuapp.com/api/profile";
const edoeitCekSaldoUrl = "https://e-doeit.herokuapp.com/api/profile";
const peepayCekSaldoUrl = "https://peepaywallet-v2.herokuapp.com/api/profile"; // get

fetch(harpayCekSaldoUrl, requestOptions)
  .then((response) => response.json())
  .then((result) => {
    saldo.innerText = result.saldo;

    // setup new headers
    var newHeadersMet4kantin = new Headers();
    newHeadersMet4kantin.append("Authorization", `Bearer ${met4kantin.jwt}`);
    requestOptions.headers = newHeadersMet4kantin;

    fetch(met4kantinCekSaldoUrl, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        saldoMet4kantin.innerText = result.data.cash.split(".")[0];

        // setup new headers
        var newHeadersEdoeit = new Headers();
        newHeadersEdoeit.append("Authorization", `Bearer ${edoeit.jwt}`);
        requestOptions.headers = newHeadersEdoeit;

        fetch(edoeitCekSaldoUrl, requestOptions)
          .then((responsoe) => responsoe.json())
          .then((result) => {
            saldoEdoeit.innerText = result.saldo;

            // setup new headers
            var newHeadersPeepay = new Headers();
            newHeadersPeepay.append("Authorization", `Bearer ${peepay.jwt}`);
            requestOptions.headers = newHeadersPeepay;

            fetch(peepayCekSaldoUrl, requestOptions)
              .then(response => response.json())
              .then(result => {
                saldoPeepay.innerText = result.balance;
              })
              .catch(err => console.log(err))
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  })
  .catch((error) => console.log("error", error));
