const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});
let playerScores = [];
io.on("connection", (socket) => {
  // console.log(socket);

  socket.on("Scores", (scores) => {
    playerScores.push({ ...scores, id: socket.id });
    console.log(playerScores);
    socket.emit("playerScores", playerScores); // send scores back to client
  });
});
httpServer.listen(3000, () => {
  console.log("server is connected");
});
