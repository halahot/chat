const io = require("socket.io-client");

const port = 9099;

let socket = io.connect(`http://localhost:${port}?type=helper`);


socket.on("user_disconnected", m =>{
  console.log(`Disconnected ${m}`);
});



socket.on("message", (m) =>{
  console.log(m);
  setTimeout(() =>{
    socket.emit("message", {
      from: socket.id,
      message: "Ghbdsnfsdf",
      to: m.socket,
    });
    console.log("sended");
  }, 3000);
});

