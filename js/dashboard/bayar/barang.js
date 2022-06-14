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

// setup request
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

// data barang
const daftarBarang = [
  {
    nama: "lampu",
    harga: 10000,
  },
  {
    nama: "colokan",
    harga: 20000,
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

  // console.log(`Kamu akan membeli ${selectedBarang} dengan harga ${hargaBayar} menggunakan ${selectedMetodeBayar}`);

  if (selectedMetodeBayar === "harpay") {
    myHeaders.append("Authorization", `Bearer ${eclogin.jwt}`);

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
  } else if (selectedMetodeBayar === "met4kantin") {
    myHeaders.append("Authorization", `Bearer ${met4kantin.jwt}`);

    var raw = JSON.stringify({
      jumlah: hargaBayar,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://met4kantin.herokuapp.com/api/pay", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        removeClass(resultContent);

        if (result.message === "Pembayaran berhasil") {
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
  } else if (selectedMetodeBayar === "edoeit") {
    myHeaders.append("Authorization", `Bearer ${edoeit.jwt}`);

    var raw = JSON.stringify({
      jumlah: hargaBayar,
      keterangan: `Beli barang ${selectedBarang} dengan harga ${hargaBayar} di e-commerce harpay`,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://e-doeit.herokuapp.com/api/pay", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        removeClass(resultContent);

        if (result.message === "Berhasil bayar") {
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
  } else if (selectedMetodeBayar === "peepay") {
    myHeaders.append("Authorization", `Bearer ${peepay.jwt}`);

    function decodeJWT(token) {
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      var jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      jsonPayload = JSON.parse(jsonPayload);
      return jsonPayload;
    }

    const decoded = decodeJWT(peepay.jwt);
    const userEmail = decoded.userEmail;

    var raw = JSON.stringify({
      email: userEmail,
      harga: hargaBayar,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    // console.log(userEmail);

    fetch("https://peepaywallet-v2.herokuapp.com/api/pembelian", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        removeClass(resultContent);

        if (result.message === "Payment success !") {
          resultContent.classList.add("alert");
          resultContent.classList.add("alert-success");
          resultContent.innerText = `${result.message}. Kamu membeli ${selectedBarang} dengan harga ${hargaBayar} menggunakan ${selectedMetodeBayar}.`;
        }
      })
      .catch((error) => {
        resultContent.classList.add("alert");
        resultContent.classList.add("alert-danger");
        resultContent.innerText = "Transaction failed";
      });
    
    resultEl.append(resultContent);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
});
