import express from "express"
import axios from "axios"

import ServerPicker from "./ServerPicker.js"

const app = express()
const PORT = process.env.PORT || 8080
const serverPicker = new ServerPicker([
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3003",
])

const handler = async (req, res) => {
  const server = serverPicker.pickIncrementally()
  const { method, url, headers, body } = req

  try {
    const response = await axios({
      url: `${server}${url}`,
      method: method,
      headers: headers,
      data: body,
    })

    res.send(response.data)
  } catch {
    res.status(500).send("Internal server error!")
  }
}

app.get("/favicon.ico", (req, res) => res.sendFile("/logo.svg"))
app.get("*", handler)

app.listen(PORT, () =>
  console.log(`Load balancer server is up and running on PORT ${PORT}...`)
)
