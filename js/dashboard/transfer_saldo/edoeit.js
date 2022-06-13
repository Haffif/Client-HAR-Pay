const edoeit = JSON.parse(localStorage.getItem("edoeit"));

if (!edoeit) {
  window.location.href = "../home/home.html";
}

// get element
const uidEl = document.getElementById("uid");
const nominalEl = document.getElementById("nominal");
const pesanEl = document.getElementById("pesan");
const submitBtn = document.getElementById("submit");

// setup header
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${edoeit.jwt}`);
myHeaders.append("Content-Type", "application/json");

// setup result
const resultEl = document.getElementById("result");
const resultContent = document.createElement("div");
resultContent.setAttribute("role", "alert");

// helper function
const removeClass = (el) => {
  el.classList.value = "";
};

// do request topup
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  var raw = JSON.stringify({
    id_tujuan: parseInt(uidEl.value),
    jumlah: parseInt(nominalEl.value),
    keterangan: pesanEl.value,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://e-doeit.herokuapp.com/api/transfer", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      removeClass(resultContent);

      if (result.message === "Berhasil transfer") {
        resultContent.classList.add("alert");
        resultContent.classList.add("alert-success");
        resultContent.innerText = result.message;
      } else if (result.message) {
        resultContent.classList.add("alert");
        resultContent.classList.add("alert-danger");
        resultContent.innerText = result.message;
      } else {
        resultContent.classList.add("alert");
        resultContent.classList.add("alert-danger");
        resultContent.innerText = "Something went wrong, please try again or check your input";
      }

      resultEl.append(resultContent);
    })
    .catch((error) => console.log("error", error));
});
