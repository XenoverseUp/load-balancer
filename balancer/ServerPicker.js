import targets from "./utils/readConfig.js"

class ServerPicker {
  #prev
  #curr = 0
  #targets = targets

  pickUniformly() {
    do {
      var random = Math.floor(Math.random() * this.#targets.length)
    } while (random === this.#prev)

    this.#prev = random
    return this.#targets[random]
  }

  pickIncrementally() {
    const picked = this.#targets[this.#curr++]
    this.#curr %= this.#targets.length

    return picked
  }

  pick() {
    // Add custom logic and remove pickUniformly()
    this.pickUniformly()
  }
}

export default ServerPicker
