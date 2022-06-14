const edoeit = JSON.parse(localStorage.getItem("edoeit"));
if (!edoeit) {
  window.location.href = "../../home/home.html";
}

// get profileEl
const profileEl = document.getElementById("profile");

var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${edoeit.jwt}`);

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

fetch("https://e-doeit.herokuapp.com/api/profile", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    // console.log(result);

    const uid = document.createElement("li");
    const nama = document.createElement("li");
    const email = document.createElement("li");
    const saldo = document.createElement("li");
    const nomorWallet = document.createElement("li");

    uid.innerText = `User ID: ${result.id_user}`;
    nama.innerText = `Nama: ${result.name}`;
    email.innerText = `Email: ${result.email}`;
    saldo.innerText = `Saldo: ${result.saldo}`;
    nomorWallet.innerText = `Nomor wallet: ${result.nomor_wallet}`;

    profileEl.append(uid, nama, email, saldo, nomorWallet);
  })
  .catch((error) => console.log("error", error));
