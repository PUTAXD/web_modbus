const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 8080;

//lib untuk ke motor
const net = require("net");
const motor = require("./class.js");
const { timeStamp } = require("console");
const client = new net.Socket();

const motor1 = new motor("169.254.196.196", 1296, 1);
const motor2 = new motor("169.254.196.197", 1297, 2);
const motor3 = new motor("169.254.196.198", 1298, 3);

app.use(express.static("main"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/main/index.html");
  // res.sendFile(__dirname + "/main/index.js");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  // client.connect(motor1.port, motor1.ip, () => {
  socket.on("motor1", (msg) => {
    client.connect(motor1.port, motor1.ip, () => {
      console.log("Terhubung ke server.");
      // console.log("chat : " + msg);
      const _id = msg[0];
      const _reg = msg[1];
      const _val = msg[2];
      client.write(motor1.modbusWrite(motor1.slave_id, msg[0], msg[1], msg[2]));
    });

    client.on("data", (data) => {
      displayRecvData("1", data);
      client.destroy();
    });
  });

  socket.on("motor2", (msg) => {
    client.connect(motor2.port, motor2.ip, () => {
      console.log("Terhubung ke server.");
      // console.log("chat : " + msg);
      const _id = msg[0];
      const _reg = msg[1];
      const _val = msg[2];
      client.write(motor2.modbusWrite(motor2.slave_id, msg[0], msg[1], msg[2]));
    });

    client.on("data", (data) => {
      displayRecvData("2", data);
      client.destroy();
    });
  });
  //

  socket.on("motor3", (msg) => {
    client.connect(motor3.port, motor3.ip, () => {
      console.log("Terhubung ke server.");
      // console.log("chat : " + msg);
      const _id = msg[0];
      const _reg = msg[1];
      const _val = msg[2];
      client.write(motor3.modbusWrite(motor3.slave_id, msg[0], msg[1], msg[2]));
    });

    client.on("data", (data) => {
      displayRecvData("3", data);
      console.log("siapa bilang");
      socket.emit("sendBack", data);
      client.destroy();
    });
  });
});

server.listen(port, () => {
  console.log("listening on *: " + port);
});

function displayRecvData(label, data) {
  let recv_data = [];
  let byte_counter = 0;

  for (i = 0; i < data.length; i++) {
    recv_data[i] = data.readUint8(i);
  }

  console.log("Motor " + label + " : ", recv_data);
}
