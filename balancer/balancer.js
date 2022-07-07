const express = require("express")
const axios = require("axios")

const ServerPicker = require("./ServerPicker.js")

const app = express()
const PORT = process.env.PORT || 8080
const serverPicker = new ServerPicker()

const httpHandler = async (req, res) => {
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

app.get("/favicon.ico", (_, res) => res.sendFile("/logo.svg"))
app.use((req, res) => httpHandler(req, res))

app.listen(PORT, () =>
  console.log(`Load balancer server is up and running on PORT ${PORT}...`)
)
