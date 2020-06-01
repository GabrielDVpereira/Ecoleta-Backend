/*
  Steps to run your project using typescript: 
  - yarn add typescript -D
  - yarn add ts-node -D
  - npx typescript --init (initialize tsc package)
  - yarn add ts-node-dev -D 
  - config.scripts.dev = " ts-node-dev src/server.ts" (Package.json)
*/

import express from "express";

const app = express();
app.use(express.json());

app.get("/users", (req, res) => {
  res.json({ message: "hello" });
});

app.listen(3333);
