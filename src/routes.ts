import express from "express";
import connection from "./database/connection";
import ItemsController from "./controllers/ItemsController";
import PointsController from "./controllers/PointsController";
import multerConfig from "./config/multer";
import multer from "multer";
import { celebrate, Joi } from "celebrate";

const routes = express.Router();
const upload = multer(multerConfig);

routes.get("/items", ItemsController.index);

routes.post(
  "/points",
  upload.single("image"),
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        cidade: Joi.string().required(),
        uf: Joi.string().required().max(2),
        items: Joi.string().required(),
      }),
    },
    { abortEarly: false } // all error messages
  ),
  PointsController.create
);

routes.get("/points/:id", PointsController.show);
routes.get("/points", PointsController.index);

export default routes;
