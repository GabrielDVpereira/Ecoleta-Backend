/*
  Steps to run your project using typescript: 
  - yarn add typescript -D
  - yarn add ts-node -D
  - npx typescript --init (initialize tsc package)
  - yarn add ts-node-dev -D 
  - config.scripts.dev = " ts-node-dev src/server.ts" (Package.json)
*/

/*
  Steps to configure knex and sqlite in your projet 
  - yarn add kenx
  - yarn add sqlite3
  - Create database/connection.ts
  - Config the connection(instructions in the connection.ts)
*/

/* 
  Creating migrations using knex
  - crate database/migrations
  - create your migration (can be created by command line, but Diago is creating by himself) - http://knexjs.org/#Migrations-CLI
  - create knexfile.ts in the root directory
  - run npx knex migrate:latest --knexfile knexfile.ts migrate:latest to populate the db 
*/

/*
  Creating seeds using Knex 
  - create folder database/seeds
  - Create your seed file in the folder, in our case it will be create_items.ts
  - In the knex file, pass the path of the seed you've just created
  - knex --knexfile knexfile.ts seed:run to run the seed
 */
import express from "express";
import routes from "./routes";
import path from "path";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(routes);
app.use(cors());
app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads"))); // express.static is a express funtin made specially to acess static files like images, word files and so on
//http://localhost:3333/uploads/baterias.svg will show a image

app.listen(3333);
