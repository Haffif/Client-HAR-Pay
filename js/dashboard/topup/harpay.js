const jumlahTopup = document.getElementById("jumlahTopup");
const submit = document.getElementById("submit");

const eclogin = JSON.parse(localStorage.getItem("eclogin"));

var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${eclogin.jwt}`);
myHeaders.append("Content-Type", "application/json");

submit.addEventListener("click", (e) => {
  e.preventDefault();

  var raw = JSON.stringify({
    nominal: jumlahTopup.value,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://harpay-api.herokuapp.com/transaksi/topup", requestOptions)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
});
