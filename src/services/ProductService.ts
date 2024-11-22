import { safeParse, parse } from "valibot";
import * as v from "valibot"; // 1.24 kB

import {
  DraftProductSchema,
  Product,
  ProductSchema,
  ProductsSchema,
} from "../types";
import axios from "axios";
// import { toBoolean } from "../utils";

type ProductData = {
  [k: string]: FormDataEntryValue;
};

export async function addProduct(data: ProductData) {
  try {
    const result = safeParse(DraftProductSchema, {
      name: data.name,
      price: +data.price,
    });
    if (result.success) {
      // post=url
      const url = `${import.meta.env.VITE_API_URL}/api/products`;
      await axios.post(url, {
        name: result.output.name,
        price: result.output.price,
      });
    } else {
      throw new Error("Datos no válidos");
    }
  } catch (error) {
    console.log(`---------------------------${error}`);
  }
}

export async function getProducts() {
  try {
    // get=url
    const url = `${import.meta.env.VITE_API_URL}/api/products`;
    const { data } = await axios(url);
    // console.log(data)
    const result = safeParse(ProductsSchema, data.data);
    // console.log(result)
    if (result.success) {
      return result.output;
    } else {
      throw new Error("Hubo un error");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getProductsByID(id: Product["id"]) {
  try {
    // get{id}=url
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    const { data } = await axios(url);
    // console.log(data)
    const result = safeParse(ProductSchema, data.data);
    // console.log(result)
    if (result.success) {
      return result.output; //retornando product
    } else {
      throw new Error("Hubo un error");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateProduct(data: ProductData, id: Product["id"]) {
  // console.log(data);
  // console.log(id);
  try {
    const NumberSchema = v.pipe(v.string(), v.transform(Number), v.number());
    const BooleanSchema = v.pipe(
      v.string(), // Primero, aseguramos que el valor es una cadena
      v.transform((str) => str.toLowerCase() === "true"), // Transformamos la cadena a booleano
      v.boolean() // Validamos que el valor transformado es un booleano
    );

    const result = safeParse(ProductSchema, {
      id, // id:id
      name: data.name,
      price: parse(NumberSchema, data.price),
      availability: parse(BooleanSchema, data.availability),
    });
    // console.log(result);
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
      await axios.put(url, result.output); // output = data creo
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProduct(id: Product["id"]) {
  // console.log(id);
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.delete(url);
  } catch (error) {
    console.log(error);
  }
}

export async function updateProductAvailability(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.patch(url);
  } catch (error) {
    console.log(error);
  }
}
