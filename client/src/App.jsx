import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Input from "./components/Input";
function App() {
  const [score, setScores] = useState({});

  const socket = io("http://localhost:3000");

  function connectSocket() {
    socket.on("connection", (socket) => {
      console.log(socket);
    });
  }

  function handelInput(event) {
    let { name, value } = event.target;
    let currentObj = { [name]: value };
    setScores((pre) => ({ ...pre, ...currentObj }));
  }
  function sendScores() {
    socket.emit("Scores", score);
    socket.on("playerScores", (playerScores) => {
      console.log(playerScores);
    });
  }

  useEffect(() => {
    connectSocket();
  }, []);
  return (
    <>
      <h1>React Multiplayer Dashboard</h1>
      <Input
        placeholder="Enter your name"
        handelInput={handelInput}
        name="name"
      />
      <Input
        placeholder="Enter your score"
        handelInput={handelInput}
        name="score"
      />
      <button onClick={sendScores}>publish</button>
    </>
  );
}

export default App;
