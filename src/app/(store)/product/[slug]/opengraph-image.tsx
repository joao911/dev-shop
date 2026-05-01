import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import colors from "tailwindcss/colors";

import { productParams } from "./page";
import { Product } from "@/data/types/products";
import { api } from "@/data/api";
import { env } from "@/env";

// Image metadata
export const alt = "About Acme";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

async function GetProduct(slug: string): Promise<Product> {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 5, // 1 hora para revalidar,
    },
  });
  const products = await response.json();
  return products;
}

// Image generation
export default async function OgImage({ params }: productParams) {
  const { slug } = await params;

  const product = await GetProduct(slug);
  const productURL = new URL(product.image, env.APP_URL).toString();

  // Font loading, process.cwd() is Next.js project directory
  const interSemiBold = await readFile(
    join(process.cwd(), "assets/Inter-SemiBold.ttf")
  );

  return new ImageResponse(
    // ImageResponse JSX element
    <div
      style={{
        background: colors.zinc[950],
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <img
        src={productURL}
        alt={product.title}
        style={{
          width: "100%",
        }}
      />
    </div>,
    // ImageResponse options
    {
      ...size,
    }
  );
}
