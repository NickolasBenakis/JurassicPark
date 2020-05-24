import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  getDinosaur,
  getDinosaurs,
  addDinosaur,
  updateDinosaur,
  deleteDinosaur,
} from "../controllers/dinosaurs.ts";

const router = new Router();

router.get("/api/v1/products", getDinosaurs)
  .get("/api/v1/products/:id", getDinosaur)
  .post("/api/v1/products", addDinosaur)
  .put("/api/v1/products/:id", updateDinosaur)
  .delete("/api/v1/products/:id", deleteDinosaur);

export default router;
