const io = require("socket.io-client");

const port = 9099;

let socket = io.connect(`http://localhost:${port}?type=user`);

socket.on("message", (m) =>{
  console.log(m);
});

socket.on("helper_disconnect", (m) =>{
  console.log(`Disconnected helper`);
});

socket.on("helper_connect", (m) =>{
  console.log(`Connected`);
})


setTimeout(() =>{
  socket.emit('message_to_help', {
    from: '1111',
    message: "Ghbdtn",
    name: "Yan",
  })
}, 7000);

