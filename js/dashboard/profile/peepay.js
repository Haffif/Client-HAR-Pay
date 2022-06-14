const peepay = JSON.parse(localStorage.getItem("peepay"));
if (!peepay) {
  window.location.href = "../../home/home.html";
}

// get profileEl
const profileEl = document.getElementById("profile");

var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${peepay.jwt}`);

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

fetch("https://peepaywallet-v2.herokuapp.com/api/profile", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    // console.log(result);

    const username = document.createElement("li");
    const email = document.createElement("li");
    const saldo = document.createElement("li");

    username.innerText = `Nama: ${result.username}`;
    email.innerText = `Email: ${result.email}`;
    saldo.innerText = `Saldo: ${result.balance}`;

    profileEl.append(username, email, saldo);
  })
  .catch((error) => console.log("error", error));
