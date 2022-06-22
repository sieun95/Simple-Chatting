const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const path = require("path");
const socketIO = require("socket.io");
const moment = require("moment");

const io = socketIO(server);

app.use(express.static(path.join(__dirname, "src")));
const PORT = 3500;

io.on("connection", (socket) => {
  socket.on("chatting", (data) => {
    const { name, msg } = data;
    io.emit("chatting", {
      name,
      msg,
      time: moment(new Date()).format("hh:mm A"),
    });
  });
});

app.get("/test", (req, res) => {
  res.send("tes");
});

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
