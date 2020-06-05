const io = require("socket.io")();

io.on("connection", (socket) => {
  // rconsole.log(socket.req.session.변수);
  console.log(socket.id);
});

module.exports = io;
