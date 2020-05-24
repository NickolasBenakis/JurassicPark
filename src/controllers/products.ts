import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Product } from "../types/types.ts";

let products: Array<Product> = [
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

const getProducts = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: products,
  };
};

const getProduct = (
  { params, response }: { params: { id: string }; response: any },
) => {
  const selectedProduct: Product | undefined = products.find((product) =>
    product.id === params.id
  );
  if (selectedProduct) {
    response.status = 200;
    response.body = {
      success: true,
      data: selectedProduct,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      data: "Product Not Found",
    };
  }
};

const addProduct = async (
  { request, response }: { request: any; response: any },
) => {
  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      msg: "No data",
    };
  } else {
    const { value : productBody } = await request.body();
    const product: Product = productBody;
    product.id = v4.generate();
    products.push(product);
    response.status = 201;
    response.body = {
      success: true,
      data: product,
    };
  }
};

const deleteProduct = (
  { params, response }: { params: { id: string }; request: any; response: any },
) => {
  const newProducts: Array<Product> = products.filter(
    (product: Product) => (product.id !== params.id),
  );
  if (newProducts.length === products.length) {
    response.status(404);
    response.body = {
      success: false,
      msg: "Not found",
    };
  } else {
    products = newProducts;
    response.status(200);
    response.body = {
      success: true,
      msg: `Product with id ${params.id} has been deleted`,
    };
  }
};

const updateProduct = async (
  { params, request, response }: {
    params: { id: string };
    request: any;
    response: any;
  },
) => {
  const requestedProduct: Product | undefined = products.find(
    (product: Product) => product.id === params.id,
  );

  if (requestedProduct) {
    const { value: updatedValue } = await request.body();
    products = products.map((product: Product) => {
      if (product.id === params.id) {
        return {
          ...product,
          updatedValue,
        };
      } else {
        return product;
      }
    });
    response.status(200);
    response.body({
      success: true,
      msg: `Product id ${params.id} updated`,
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
  updateProduct,
  deleteProduct,
  getProducts,
  getProduct,
  addProduct,
};
