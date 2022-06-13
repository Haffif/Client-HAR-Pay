localStorage.removeItem("eclogin");
localStorage.removeItem("met4kantin");
localStorage.removeItem("edoeit");

const nama = document.getElementById("nama");
const email = document.getElementById("email");
const noTelp = document.getElementById("noTelp");
const password = document.getElementById("password");
const konfirmasiPassword = document.getElementById("konfirmasiPassword");
const pin = document.getElementById("pin");
const konfirmasiPin = document.getElementById("konfirmasiPin");

const buttonSubmit = document.getElementById("submit");
const resultEl = document.getElementById("result");

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const resultContent = document.createElement("div");
resultContent.setAttribute("role", "alert");

const removeClass = (el) => {
  el.classList.value = "";
};

const harpayRegistUrl = "https://harpay-api.herokuapp.com/auth/registrasi";
const met4kantinRegistUrl = "https://met4kantin.herokuapp.com/api/profile";
const e_doeitRegistUrl = "https://e-doeit.herokuapp.com/api/registrasi";

buttonSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  var raw = JSON.stringify({
    name: nama.value,
    email: email.value,
    noTelp: noTelp.value,
    password: password.value,
    konfirmasiPassword: konfirmasiPassword.value,
    pin: pin.value,
    konfirmasiPin: konfirmasiPin.value,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(harpayRegistUrl, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      // setup remove class result content
      removeClass(resultContent);

      if (result.message === "User created") {
        // setup new body for other requests
        requestOptions.body = JSON.stringify({
          name: nama.value,
          email: email.value,
          pass: password.value,
        });

        // catch met4kantin
        fetch(met4kantinRegistUrl, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result.message === "Pendaftaran berhasil") {
              fetch(e_doeitRegistUrl, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                  if (result.message === "Pendaftaran Berhasil") {
                    resultContent.classList.add("alert");
                    resultContent.classList.add("alert-success");
                    resultContent.innerText = "Buat akun untuk harpay, met4kantin, e-doeit berhasil!";

                    setTimeout(() => {
                      window.location.href = "./login.html";
                    }, 1000);
                  } else {
                    resultContent.classList.add("alert");
                    resultContent.classList.add("alert-danger");
                    resultContent.innerText = "Failed to create an account for e_doeit";
                  }
                })
                .catch((err) => {
                  console.log(err);
                  alert("Terjadi kesalahan pada server e-doeit, silahkan cek console");
                });
            } else {
              resultContent.classList.add("alert");
              resultContent.classList.add("alert-danger");
              resultContent.innerText = "Failed to create an account for met4kantin";
            }
          })
          .catch((error) => {
            console.log(error);
            alert("Terjadi kesalahan pada server met4kantin, silahkan cek console");
          });
      } else {
        resultContent.classList.add("alert");
        resultContent.classList.add("alert-danger");
        resultContent.innerText = "Failed to create an account for harpay";
      }

      resultEl.append(resultContent);

      document.body.scrollTop = 0; // safari
      document.documentElement.scrollTop = 0; // chrome
    })
    .catch((error) => {
      console.log("error", error);
      alert("Terjadi kesalahan pada server harpay, silahkan cek console");
    });
});
