import express from "express";
import connection from "./database/connection";
import knex from "knex";
const routes = express.Router();

routes.get("/items", async (req, res) => {
  const items = await connection("items").select("*");
  const serializedItems = items.map((item) => {
    return {
      title: item.title,
      image_url: `http://localhost:3333/uploads/${item.image}`,
    };
  });
  return res.json(serializedItems);
});

routes.post("/points", async (req, res) => {
  const {
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
    items,
  } = req.body;

  try {
    await connection("points").insert({
      image: "image-fake",
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    });

    return res.json({ sucess: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message || error });
  }
});

export default routes;
