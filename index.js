const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

// Chat
// io.on("connection", (socket) => {
//   console.log("usuário conectado");
//   socket.on("chat message", (msg) => {
//     io.emit("chat message", msg);
//   });
// });

io.on("connection", (socket) => {
  console.log("Usuário conectado");

  // Escuta o evento 'barcode'
  socket.on("barcode", (code) => {
    console.log("Código de barras recebido: ", code);

    // Emite agora o 'barcode' para as conexões
    io.emit("barcode-received", code);
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
