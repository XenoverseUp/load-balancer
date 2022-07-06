import express from "express"

const app = express()
const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {
  res.json({
    message: `Hello from PORT ${PORT}`,
  })
})

app.listen(PORT, () =>
  console.log(`Server is up and running on PORT ${PORT}...`)
)