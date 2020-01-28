const io = require("socket.io-client");

const port = 5589;

let socket = io.connect(`http://localhost:${port}?type=user&login=123&token=321`);

// socket.on("message", (m) =>{
//   console.log(m);
// });


setTimeout(() =>{
  socket.emit('message', {
    from: '1111',
    message: "Ghbdtn",
    name: "Yan",
  })
}, 1000);

