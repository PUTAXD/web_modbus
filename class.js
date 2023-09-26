const { buffer } = require("stream/consumers");

class motor {
  ip = "69.69.69.69";
  port = 6969;
  slave_id = 69;

  constructor(ip, port, slave_id) {
    this.ip = ip;
    this.port = port;
    this.slave_id = slave_id;
  }

  modbusWrite(_slave_id, _modbus_function_code, _register, _value) {
    let data = Buffer.allocUnsafe(12);

    let used_val = _value;
    if (_value < 0) {
      used_val = 65536 + Number(_value);
    }

    console.log(used_val);
    for (let i = 0; i < 5; i++) {
      data.writeUInt8(0, i);
    }

    data.writeUInt8(6, 5);
    data.writeUInt8(_slave_id, 6);
    data.writeUInt8(_modbus_function_code, 7);

    data.writeUInt8(_register >> 8, 8);
    data.writeUInt8(_register & 255, 9);

    data.writeUInt8(used_val >> 8, 10);
    data.writeUInt8(used_val & 255, 11);

    return data;
  }
}
module.exports = motor;
