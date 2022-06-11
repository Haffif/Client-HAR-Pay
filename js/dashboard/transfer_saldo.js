const eclogin = JSON.parse(localStorage.getItem("eclogin"));

if (!eclogin) {
  window.location.href = "../home/home.html";
}
