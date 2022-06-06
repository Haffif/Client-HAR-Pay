const eclogin = JSON.parse(localStorage.getItem("eclogin"));

if (!eclogin) {
  window.location.href = "../home/home.html";
}

// setup request
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${eclogin.jwt}`);
myHeaders.append("Content-Type", "application/json");

// data barang
const daftarBarang = [
  {
    nama: "lampu",
    harga: 10000,
  },
  {
    nama: "colokan",
    harga: 10000,
  },
  {
    nama: "genset",
    harga: 500000,
  },
  {
    nama: "powerbank",
    harga: 100000,
  },
];

// helper variable
const resultEl = document.getElementById("result");
const radioBarang = document.querySelectorAll('input[name="pilihBarang"]');
const radioBayar = document.querySelectorAll('input[name="metodeBayar"]');
const pinInput = document.getElementById("pin");
let selectedBarang = null;
let selectedMetodeBayar = null;
let hargaBayar = null;
const submitBtn = document.getElementById("submit");

// helper for request
const resultContent = document.createElement("div");
resultContent.setAttribute("role", "alert");
const removeClass = (el) => {
  el.classList.value = "";
};

// do request (checkout)
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  for (const sBar of radioBarang) {
    if (sBar.checked) {
      selectedBarang = sBar.value;
      break;
    }
  }

  for (const sBay of radioBayar) {
    if (sBay.checked) {
      selectedMetodeBayar = sBay.value;
      break;
    }
  }

  for (const itemBar of daftarBarang) {
    if (itemBar.nama === selectedBarang) {
      hargaBayar = itemBar.harga;
      break;
    }
  }

  // console.log(`Kamu akan membeli ${selectedBarang} dengan harga ${hargaBayar} menggunakan ${selectedMetodeBayar} dengan pin ${pinInput.value}`);

  var raw = JSON.stringify({
    jumlahBayar: hargaBayar,
    pin: parseInt(pinInput.value),
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://harpay-api.herokuapp.com/transaksi/bayar", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      removeClass(resultContent);
      if (result.message && result.message === "Transaction successfully") {
        resultContent.classList.add("alert");
        resultContent.classList.add("alert-success");
        resultContent.innerText = `${result.message}. Kamu membeli ${selectedBarang} dengan harga ${hargaBayar} menggunakan ${selectedMetodeBayar}.`;
      } else if (result.message) {
        resultContent.classList.add("alert");
        resultContent.classList.add("alert-danger");
        resultContent.innerText = result.message;
      } else {
        resultContent.classList.add("alert");
        resultContent.classList.add("alert-danger");
        resultContent.innerText = "Transaction failed";
      }

      resultEl.append(resultContent);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    })
    .catch((error) => console.log("error", error));
});
