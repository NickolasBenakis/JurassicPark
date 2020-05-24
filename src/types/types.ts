export interface Dinosaur {
  id: string;
  name: string;
  era: string;
  area: string;
  diet: string;
}

export interface Response {
  status: number;
  body: ResponseBody;
}

export interface ResponseBody {
  msg?: string;
  data?: Array<Dinosaur> | Dinosaur;
  success: Boolean;
}
