import express from 'express'; 

const routes = express.Router();

routes.get("/users", (req, res) => {
  return res.json({ message: "hello" });
});

export default routes;