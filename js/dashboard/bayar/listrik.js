const eclogin = JSON.parse(localStorage.getItem("eclogin"));

if (!eclogin) {
  window.location.href = "../home/home.html";
}

// get variable cekStatus
const cekStatus = document.getElementById("cekStatus");
const cekBtn = document.getElementById("cekBtn");
const inputIdPelangganCek = document.getElementById("id_pelanggan_cek");

// get variable bayar
const bayarStatus = document.getElementById("bayarStatus");
const bayarBtn = document.getElementById("bayarBtn");
const inputIdPelangganBayar = document.getElementById("id_pelanggan_bayar");
const inputPin = document.getElementById("pin");

// setup cekStatus content
const resultContentCek = document.createElement("div");
resultContentCek.setAttribute("role", "alert");

// setup cekBayar content
const resultContentBayar = document.createElement("div");
resultContentBayar.setAttribute("role", "alert");

// helper function
const removeClass = (el) => {
    el.classList.value = "";
};

// setup header
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", `Bearer ${eclogin.jwt}`);

// request cek status
cekBtn.addEventListener("click", (e) => {
    e.preventDefault();

    var raw = JSON.stringify({
        "idPelanggan": inputIdPelangganCek.value,
    });
      
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    
    fetch("https://harpay-api.herokuapp.com/transaksi/cekPembayaranListrik", requestOptions)
        .then(response => response.json())
        .then(result => {
            // console.log(result);
            removeClass(resultContentCek)

            if (result.message && result.message === "Please do a payment for this month") {
                resultContentCek.classList.add("alert");
                resultContentCek.classList.add("alert-danger");
                resultContentCek.innerText = result.message;
            } else if (result.message === "ID pelanggan already made payment for this month") {
                resultContentCek.classList.add("alert");
                resultContentCek.classList.add("alert-success");
                resultContentCek.innerText = result.message;
            } else if (result.message) {
                resultContentCek.classList.add("alert");
                resultContentCek.classList.add("alert-warning");
                resultContentCek.innerText = result.message;
            } else {
                resultContentCek.classList.add("alert");
                resultContentCek.classList.add("alert-danger");
                resultContentCek.innerText = "Something went wrong";
            }

            cekStatus.append(resultContentCek);
        })
        .catch(error => console.log('error', error));
});
