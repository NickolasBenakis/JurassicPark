import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  getDinosaur,
  getDinosaurs,
  addDinosaur,
  updateDinosaur,
  deleteDinosaur,
} from "../controllers/dinosaurs.ts";
const router = new Router();

router.get("/api/v1/dinosaurs", getDinosaurs)
  .get("/api/v1/dinosaurs/:id", getDinosaur)
  .post("/api/v1/dinosaurs", addDinosaur)
  .put("/api/v1/dinosaurs/:id", updateDinosaur)
  .delete("/api/v1/dinosaurs/:id", deleteDinosaur);

export default router;
