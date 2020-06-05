var io = require("socket.io");

io.on("connection", (socket) => {
  console.log(socket.req.session.변수);
});
