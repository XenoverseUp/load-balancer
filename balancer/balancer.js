const express = require("express")
const axios = require("axios")

const ServerPicker = require("./ServerPicker.js")

const app = express()
const admin = express()

const SERVING_PORT = parseInt(process.argv.slice(3)) || 8000
const ADMIN_PORT = parseInt(process.argv.slice(2)) || 8090
const serverPicker = new ServerPicker()

let select = true

admin.use(express.json())

const httpHandler = async (req, res) => {
  const server = select
    ? serverPicker.pickIncrementally()
    : serverPicker.pickUniformly()

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

app.listen(SERVING_PORT, () =>
  console.log(
    `Load balancer server is up and running on PORT ${SERVING_PORT}...`
  )
)

admin.post("/", (req, res) => {
  const { action } = req.body
  const message =
    action === "round-robin"
      ? "Load Balancer is switched to round robin"
      : action === "random"
      ? "Load Balancer is switched to random"
      : "Invalid action. No change."

  if (action === "round-robin") select = true
  else if (action === "random") select = false

  return res.send({ message })
})

admin.listen(ADMIN_PORT, () =>
  console.log(`Administrator server is up and running on PORT ${ADMIN_PORT}...`)
)
