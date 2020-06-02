import connection from "../database/connection";
import { Resquest, Response } from "express";
class PointsController {
  async create(req: Resquest, res: Response) {
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
      const trx = await connection.transaction(); // transaction, now it will finish all the calls for trx if all of them succeeds

      const point = {
        image:
          "https://images.unsplash.com/photo-1569180880150-df4eed93c90b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80",
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
      };
      const insertedIds = await trx("points").insert(point);

      const point_id = insertedIds[0];

      const pointItems = items.map((item_id: number) => {
        return {
          item_id,
          point_id,
        };
      });

      await trx("point_items").insert(pointItems);

      await trx.commit();
      return res.status(201).json({ ...point, id: point_id });
    } catch (error) {
      trx.rollback();
      return res.status(400).json({ error: error.message || error });
    }
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const [point] = await connection("points").where("id", id).select("*");

      if (!point) res.status(404).json({ error: "point not found" });

      const items = await connection("items")
        .join("point_items", "items.id", "=", "point_items.item_id")
        .where("point_items.point_id", id)
        .select("items.title"); // bringing all items that has point id passsed through params

      return res.json({ point, items });
    } catch (error) {
      return res.status(400).json({ error: error.message || error });
    }
  }

  async index(req: Request, res: Response) {
    const { city, uf, items } = req.query;

    const parseItems = String(items)
      .split(",")
      .map((item) => Number(item.trim()));

    const points = await connection("points")
      .join("point_items", "points.id", "=", "point_items.point_id")
      .whereIn("point_items.item_id", parseItems)
      .where("city", String(city))
      .where("uf", String(uf))
      .distinct()
      .select("points.*");
    return res.json(points);
  }
}

export default new PointsController();
