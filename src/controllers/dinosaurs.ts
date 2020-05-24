import { v4 } from "https://deno.land/std/uuid/mod.ts";
import {
  Dinosaur,
} from "../types/types.ts";

let dinosaurs: Array<Dinosaur> = [
  {
    id: "1",
    name: "Achillobator",
    era: "Late Cretaceous",
    area: "Mongolia",
    diet: "carnivorous",
  },
  {
    id: "2",
    name: "Agilisaurus",
    era: "Late Jurassic",
    area: "China",
    diet: "herbivorous",
  },
  {
    id: "3",
    name: "Melanorosaurus",
    era: "Late Triassic",
    area: "South Africa",
    diet: "omnivorous",
  },
];

const getDinosaurs = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: dinosaurs,
  };
};

const getDinosaur = (
  { params, response }: { params: { id: string }; response: any },
) => {
  const selectedDino: Dinosaur | undefined = dinosaurs.find((dino) =>
    dino.id === params.id
  );
  if (selectedDino) {
    response.status = 200;
    response.body = {
      success: true,
      data: selectedDino,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      data: "Dinosaur Not Found",
    };
  }
};

const addDinosaur = async (
  { request, response }: { request: any; response: any },
) => {
  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      msg: "No data",
    };
  } else {
    const { value : dinosaurBody } = await request.body();
    const dinosaur: Dinosaur = dinosaurBody;
    dinosaur.id = v4.generate();
    dinosaurs.push(dinosaur);
    response.status = 201;
    response.body = {
      success: true,
      data: dinosaur,
    };
  }
};

const deleteDinosaur = (
  { params, response }: { params: { id: string }; request: any; response: any },
) => {
  const filteredDinosaurs: Array<Dinosaur> = dinosaurs.filter(
    (product: Dinosaur) => (product.id !== params.id),
  );
  if (filteredDinosaurs.length === dinosaurs.length) {
    response.status(404);
    response.body = {
      success: false,
      msg: "Not found",
    };
  } else {
    dinosaurs = filteredDinosaurs;
    response.status(200);
    response.body = {
      success: true,
      msg: `Dinosaur with id ${params.id} has been deleted`,
    };
  }
};

const updateDinosaur = async (
  { params, request, response }: {
    params: { id: string };
    request: any;
    response: any;
  },
) => {
  const requestedDinosaur: Dinosaur | undefined = dinosaurs.find(
    (dinosaur: Dinosaur) => dinosaur.id === params.id,
  );

  if (requestedDinosaur) {
    const { value: updatedValue } = await request.body();
    dinosaurs = dinosaurs.map((dinosaur: Dinosaur) => {
      if (dinosaur.id === params.id) {
        return {
          ...dinosaur,
          updatedValue,
        };
      } else {
        return dinosaur;
      }
    });
    response.status(200);
    response.body({
      success: true,
      msg: `Dinosaur id ${params.id} updated`,
    });
  } else {
    response.status(404);
    response.body({
      success: false,
      msg: `Not Found`,
    });
  }
};

export {
  updateDinosaur,
  deleteDinosaur,
  getDinosaurs,
  getDinosaur,
  addDinosaur,
};
