import data from "../data.json";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const filteredProducts = data.products.filter((item) => item.featured);
  return Response.json(filteredProducts);
}
