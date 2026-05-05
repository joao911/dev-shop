import { api } from "@/data/api";
import { Product } from "@/data/types/products";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

async function searchProducts(query: string): Promise<Product[]> {
  const response = await api(`/products/search?q=${query}`, {
    next: {
      revalidate: 60 * 5,
    },
  });
  const products = await response.json();
  return products;
}

export default async function Search({ searchParams }: SearchPageProps) {
  const { q: query } = await searchParams;

  const products = await searchProducts(query || "");

  console.log("query", products);
  if (!query) {
    redirect("/");
  }
  return (
    <div className="flex flex-col gap-4">
      <p>
        Resultados para <span className="font-semibold">{query}</span>
      </p>
      <div className="grid grid-cols-3 gap-6">
        {products.map((item) => (
          <Link
            href={`/product/${item.slug}`}
            className="relative group  rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
          >
            <Image
              src={item.image}
              className="group-hover:scale-105 transition-transform duration-500"
              width={480}
              height={480}
              quality={100}
              alt=""
            />

            <div className="absolute rounded-full bottom-28 right-28 h-12 flex items-center gap-2 max-w-70 border-2 border-zinc-500 bg-black/60 p-1 pl-5">
              <span className="text-sm truncate">{item.title}</span>
              <span className="flex w-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
                R$ {item.price}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
