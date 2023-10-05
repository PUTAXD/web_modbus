//just a test
const net = require("net");
const motor = require("./class.js");
const { timeStamp } = require("console");
const client = new net.Socket();

const motor1 = new motor("169.254.196.196", 1296, 1);
const motor2 = new motor("169.254.196.197", 1297, 2);
const motor3 = new motor("169.254.196.198", 1298, 3);

client.connect(motor2.port, motor2.ip, () => {
  console.log("Terhubung ke server.");

  client.write(motor2.modbusWrite(motor2.slave_id, 6, 514, 100));
});

client.on("data", (data) => {
  let recv_data = [];
  let byte_counter = 0;

  for (i = 0; i < data.length; i++) {
    recv_data[i] = data.readUint8(i);
  }

  console.log("Menerima pesan dari server:", recv_data);
  //   client.end();
});
