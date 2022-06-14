const met4kantin = JSON.parse(localStorage.getItem("met4kantin"));
if (!met4kantin) {
  window.location.href = "../../home/home.html";
}

// get profileEl
const profileEl = document.getElementById("profile");

var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${met4kantin.jwt}`);

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

fetch("https://met4kantin.herokuapp.com/api/profile", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    // console.log(result);

    const uid = document.createElement("li");
    const nama = document.createElement("li");
    const email = document.createElement("li");
    const password = document.createElement("li");
    const role = document.createElement("li");
    const saldo = document.createElement("li");

    uid.innerText = `User ID: ${result.data.uid}`;
    nama.innerText = `Nama: ${result.data.name}`;
    email.innerText = `Email: ${result.data.email}`;
    password.innerText = `Password: ${result.data.pass}`;
    role.innerText = `Role: ${result.data.role}`;
    saldo.innerText = `Saldo: ${result.data.cash}`;

    profileEl.append(uid, nama, email, password, role, saldo);
  })
  .catch((error) => console.log("error", error));
