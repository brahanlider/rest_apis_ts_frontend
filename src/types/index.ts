// import { boolean, number, object, string, InferOutput, array } from "valibot";
import * as v from "valibot"; // 1.24 kB

export const DraftProductSchema = v.object({
  name: v.string(),
  price: v.number(),
});

export const ProductSchema = v.object({
  id: v.number(),
  name: v.string(),
  price: v.number(),
  availability: v.boolean(),
});

export const ProductsSchema = v.array(ProductSchema);
export type Product = v.InferOutput<typeof ProductSchema>;
