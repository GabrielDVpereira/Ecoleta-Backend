import express from "express";
import connection from "./database/connection";
import ItemsController from "./controllers/ItemsController";
import PointsController from "./controllers/PointsController";
import multerConfig from "./config/multer";
import multer from "multer";

const routes = express.Router();
const upload = multer(multerConfig);

routes.get("/items", ItemsController.index);

routes.post("/points", upload.single("image"), PointsController.create);

routes.get("/points/:id", PointsController.show);
routes.get("/points", PointsController.index);

export default routes;
