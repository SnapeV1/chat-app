require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const socketIo = require("socket.io");
const authRoutes = require("./routes/auth");
const UserRoutes = require("./routes/userRoutes");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000", 
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use("/api", authRoutes);
app.use("/api/users", UserRoutes);


// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Socket.io connection
io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  socket.on("sendMessage", (message) => {
    io.emit("receiveMessage", message); 
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
