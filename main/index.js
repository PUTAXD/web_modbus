// Inisialisasi socket.io
const socket = io();

document.getElementById("send-button1").addEventListener("click", function () {
  sendToServer("1");
});

document.getElementById("send-button2").addEventListener("click", function () {
  sendToServer("2");
});

document.getElementById("send-button3").addEventListener("click", function () {
  sendToServer("3");
});

socket.on("sendBack", (msg) => {
  document.getElementById("message").innerHTML = "<p>Hallo</p>";
  console.log("Masuk");
});

function sendToServer(label) {
  let message = [];

  const functionCode = document.getElementById("functionCode" + label);
  message[0] = functionCode.value;

  const register = document.getElementById("register" + label);
  message[1] = register.value;

  const value = document.getElementById("value" + label);
  message[2] = value.value;

  if (message) {
    // Mengirim pesan ke server melalui socket.io
    socket.emit("motor" + label, message);

    // Mengosongkan input pesan
    functionCode.value = "";
    register.value = "";
    value.value = "";
  }
  // console.log("Hallo World");
}
