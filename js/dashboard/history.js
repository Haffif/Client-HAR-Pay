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

var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${eclogin.jwt}`);

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

const bodyTableHistory = document.getElementById("body-table-history");
const bodyTableHistoryEdoeit = document.getElementById("body-table-history-edoeit");

let index = 1;

fetch("https://harpay-api.herokuapp.com/transaksi/cekHistory", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    result.data.forEach((history) => {
      // creating element
      const trEl = document.createElement("tr");

      const noTd = document.createElement("td");
      const jenisTransaksiTd = document.createElement("td");
      const nominalPengeluaranTd = document.createElement("td");
      const jumlahTopupTd = document.createElement("td");

      noTd.innerText = index;
      jenisTransaksiTd.innerText = history.jenisTransaksi;
      nominalPengeluaranTd.innerText = history.nominalPengeluaran;
      jumlahTopupTd.innerText = history.jumlahTopup;

      index++;

      trEl.append(noTd, jenisTransaksiTd, nominalPengeluaranTd, jumlahTopupTd);
      bodyTableHistory.append(trEl);
    });

    // e-doeit
    index = 1;

    // setup new headers
    var myHeadersEdoeit = new Headers();
    myHeadersEdoeit.append("Authorization", `Bearer ${edoeit.jwt}`);
    requestOptions.headers = myHeadersEdoeit;

    fetch("https://e-doeit.herokuapp.com/api/history", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        result.forEach((item) => {
          // creating element
          const trEl = document.createElement("tr");

          const noTd = document.createElement("td");
          const keteranganTd = document.createElement("td");
          const jumlahTd = document.createElement("td");

          noTd.innerText = index;
          keteranganTd.innerText = item.keterangan;
          jumlahTd.innerText = item.jumlah;

          index++;

          trEl.append(noTd, keteranganTd, jumlahTd);
          bodyTableHistoryEdoeit.append(trEl);
        });
      })
      .catch((error) => console.log("error", error));
  })
  .catch((error) => console.log("error", error));
