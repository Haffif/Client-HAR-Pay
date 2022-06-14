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
