const fs = require("fs")
const events = require("events")
const readline = require("readline")

const targets = []

;(async function processLineByLine() {
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream("./balancer/.endpoints"),
      crlfDelay: Infinity,
    })

    rl.on("line", (line) => {
      targets.push(line)
    })

    await events.once(rl, "close")
  } catch (err) {
    console.error(err)
  }
})()

module.exports = targets
