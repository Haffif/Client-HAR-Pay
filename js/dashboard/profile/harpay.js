const eclogin = JSON.parse(localStorage.getItem("eclogin"));
if (!eclogin) {
  window.location.href = "../../home/home.html";
}

// get profileEl
const profileEl = document.getElementById("profile");

var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${eclogin.jwt}`);

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

fetch("https://harpay-api.herokuapp.com/auth/profile", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    // console.log(result);

    const nama = document.createElement("li");
    const email = document.createElement("li");
    const noTelp = document.createElement("li");
    const saldo = document.createElement("li");

    nama.innerText = `Nama: ${result.name}`;
    email.innerText = `Email: ${result.email}`;
    noTelp.innerText = `No telpon: ${result.noTelp}`;
    saldo.innerText = `Saldo: ${result.saldo}`;

    profileEl.append(nama, email, noTelp, saldo);
  })
  .catch((error) => console.log("error", error));
