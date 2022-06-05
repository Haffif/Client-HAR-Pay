var myHeaders = new Headers();
myHeaders.append(
  "Authorization",
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjliNWI5OTc0NjM2NTA2NjkyMGIxYTgiLCJuYW1lIjoiUmFtYSBNdWhhbW1hZCBNdXJzaGFsIiwiZW1haWwiOiJybXVyc2hhbEBnbWFpbC5jb20iLCJub1RlbHAiOjYyODEyOTk5OTg4ODgsImlhdCI6MTY1NDM0ODcyNiwiZXhwIjoxNjU0MzUyMzI2fQ.I1ufhY5HAzgOoPo5G2_K1mCWhL94aKWHi4cWrVX68-I"
);

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

fetch("https://harpay-api.herokuapp.com/transaksi/cekSaldo", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
