# Agilisaurus

[<img src="deno-logo.svg" align="right" width="100">](https://deno.land)

Deno is a simple, modern and secure runtime for JavaScript and TypeScript that uses V8 and is built in Rust.

This is a simple Rest API build with OAK framework and Deno.



## Server
```ts
import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./src/routes/routes.ts";

const port = 8000;
const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server running on port ${port}`);
await app.listen({ port });
```

## Routes

```ts
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
```
## Types 
```ts
export interface Dinosaur {
  id: string;
  name: string;
  era: string;
  area: string;
  diet: string;
}
```



## Endpoints examples

- /api/v1/dinosaurs

	```
   {
    "success": true,
    "data": [
      {
        "id": "1",
        "name": "Achillobator",
        "era": "Late Cretaceous",
        "area": "Mongolia",
        "diet": "carnivorous"
      },
      {
        "id": "2",
        "name": "Agilisaurus",
        "era": "Late Jurassic",
        "area": "China",
        "diet": "herbivorous"
      },
      {
        "id": "3",
        "name": "Melanorosaurus",
        "era": "Late Triassic",
        "area": "South Africa",
        "diet": "omnivorous"
      }
    ]
  }

- /api/v1/dinosaurs/1

```
  {
    "success": true,
    "data": [
      {
        "id": "1",
        "name": "Achillobator",
        "era": "Late Cretaceous",
        "area": "Mongolia",
        "diet": "carnivorous"
      }
    ]
  }
  
  
