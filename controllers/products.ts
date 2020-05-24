import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Product } from "../types.ts";

let products: Product[] = [
  {
    id: "1",
    name: "Product One",
    description: "This is product one",
    price: 99.99,
  },
  {
    id: "2",
    name: "Product Two",
    description: "This is product two",
    price: 150.99,
  },
  {
    id: "3",
    name: "Product Three",
    description: "This is product three",
    price: 199.99,
  },
];

export const getProducts = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: products,
  };
	console.log(products)
};

export const getProduct = ({ params,response} : {params:{id:string},response:any}) => {

	const selectedProduct : Product | undefined = products.find(product => product.id === params.id);
	if (selectedProduct){
		response.status= 200;
		response.body = {
			success: true,
			data: selectedProduct
		}
	} else {
		response.status= 404;
		response.body= {
			success: false,
			data: "Product Not Found"
		}
	}

}
