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
        image: "image-fake",
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
      return res.status(201).json({ ...point, id: point_id });
    } catch (error) {
      return res.status(400).json({ error: error.message || error });
    }
  }
}

export default new PointsController();
