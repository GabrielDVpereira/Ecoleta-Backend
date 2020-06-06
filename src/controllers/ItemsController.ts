import connection from "../database/connection";
import { Resquest, Response } from "express";

class ItemsController {
  async index(req: Resquest, res: Response) {
    const items = await connection("items").select("*");
    const serializedItems = items.map((item) => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://192.168.0.31:5000/uploads/${item.image}`,
      };
    });
    return res.json(serializedItems);
  }
}

export default new ItemsController();
