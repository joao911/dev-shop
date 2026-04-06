import { api } from "@/data/api";
import { Product } from "@/data/types/products";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

async function GetFeaturedProducts(): Promise<Product[]> {
  const response = await api("/products/filtered", {
    next: {
      revalidate: 60 * 5,
    },
  });
  const products = await response.json();
  return products;
}

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  const [highlightedProducts, ...otherProducts] = await GetFeaturedProducts();

  return (
    <div className="grid max-h-215 grid-cols-9 grid-rows-6 gap-6">
      <Link
        href={`/product/${highlightedProducts.slug}`}
        className="relative group col-span-6 row-span-6 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
      >
        <Image
          src={highlightedProducts.image}
          className="group-hover:scale-105 transition-transform duration-500"
          width={920}
          height={920}
          quality={100}
          alt=""
        />

        <div className="absolute rounded-full bottom-28 right-28 h-12 flex items-center gap-2 max-w-70 border-2 border-zinc-500 bg-black/60 p-1 pl-5">
          <span className="text-sm truncate">{highlightedProducts.title}</span>
          <span className="flex w-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
            R$ {highlightedProducts.price}
          </span>
        </div>
      </Link>
      {otherProducts.map((item) => (
        <Link
          key={item.id}
          href={`/product/${item.slug}`}
          className="relative group col-span-3 row-span-3 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
        >
          <Image
            src={item.image}
            className="group-hover:scale-105 transition-transform duration-500"
            width={920}
            height={920}
            quality={100}
            alt=""
          />
          <div className="rounded-full absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-70 border-2 border-zinc-500 bg-black/60 p-1 pl-5">
            <span className="text-sm truncate">{item.title}</span>
            <span className="flex w-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
              R$ {item.price}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
