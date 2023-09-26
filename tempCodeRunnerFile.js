
    const _reg = msg[1];
    const _val = msg[2];
    client.write(motor1.modbusWrite(motor1.slave_id, _id, _reg, _val));
    // });

    // client.on("data", (data) => {