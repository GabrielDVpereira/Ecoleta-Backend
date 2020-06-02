import connection from "../database/connection";
import { Resquest, Response } from "express";

class ItemsController {
  async index(req: Resquest, res: Response) {
    const items = await connection("items").select("*");
    const serializedItems = items.map((item) => {
      return {
        title: item.title,
        image_url: `http://localhost:3333/uploads/${item.image}`,
      };
    });
    return res.json(serializedItems);
  }
}

export default new ItemsController();
