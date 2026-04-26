import { z } from "zod";

import data from "../data.json";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const product = data.products.find((item) => item.slug === slug);

  if (!product) {
    return Response.json({ message: "Product not found" }, { status: 400 });
  }

  return Response.json(product);
}
