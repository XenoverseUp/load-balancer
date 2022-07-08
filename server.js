const express = require("express")
const http = require("http")

const app = express()
const server = http.Server(app)
const io = require("socket.io")(server)
const PORT = parseInt(process.argv.slice(2)) || 3000

app.get("/", (req, res) => {
  res.json({
    message: `Hello from PORT ${PORT}`,
  })
})

io.on("connection", function (socket) {
  console.log("A user is connected.")

  socket.on("disconnect", function () {
    console.log("A user has just disconnected.")
  })
})

server.listen(PORT, () =>
  console.log(`Server is up and running on PORT ${PORT}...`)
)
