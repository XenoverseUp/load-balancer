# Load balancer in NodeJS

This is a load balancer implementation written in NodeJS. To add custom logic, edit the file `/balancer/ServerPicker.js`, `pick` method.

#### `npm install`

It installs all dependencies.

---

#### `npm run dev`

It runs all servers and load balancer server concurrently.

---

#### `npm run servers`

It runs servers.

---

#### `npm run balancer`

It runs balancer.

---

#### curl --location --request GET 'http://localhost:8080'

Makes a request to local load balancer

---

#### curl --location --request POST 'http://localhost:3080' --header 'Content-Type: application/json' --data-raw '{ "action": "round-robin" }'

Sends behavior change to the load balancer's admin port