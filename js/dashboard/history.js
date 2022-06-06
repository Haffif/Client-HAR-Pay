const eclogin = JSON.parse(localStorage.getItem("eclogin"));

if (!eclogin) {
  window.location.href = "../home/home.html";
}

var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${eclogin.jwt}`);

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

const bodyTableHistory = document.getElementById("body-table-history");

let index = 1;

fetch("https://harpay-api.herokuapp.com/transaksi/cekHistory", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    result.data.forEach((history) => {
      // console.log(history);

      // creating element
      const trEl = document.createElement("tr");

      const noTd = document.createElement("td");
      const namaTd = document.createElement("td");
      const jenisTransaksiTd = document.createElement("td");
      const nominalPengeluaranTd = document.createElement("td");
      const jumlahTopupTd = document.createElement("td");

      noTd.innerText = index;
      namaTd.innerText = history.userNama;
      jenisTransaksiTd.innerText = history.jenisTransaksi;
      nominalPengeluaranTd.innerText = history.nominalPengeluaran;
      jumlahTopupTd.innerText = history.jumlahTopup;

      index++;

      trEl.append(noTd, namaTd, jenisTransaksiTd, nominalPengeluaranTd, jumlahTopupTd);
      bodyTableHistory.append(trEl);
    });
  })
  .catch((error) => console.log("error", error));
