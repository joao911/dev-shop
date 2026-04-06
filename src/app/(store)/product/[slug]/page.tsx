import { api } from "@/data/api";
import { Product } from "@/data/types/products";
import { Metadata } from "next";
import Image from "next/image";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

async function GetProduct(slug: string): Promise<Product> {
  const response = await api(`/product/${slug}`, {
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

// export async function generateMetadata({
//   params,
// }: ProductPageProps): Promise<Metadata> {
//   const product = await GetProduct(params.slug);
//   return {
//     title: product.title,
//   };
// }

// export async function generateStaticParams() {
//   const response = await api("/products/filtered");

//   const products: Product[] = await response.json();
//   return products.map((item) => ({ slug: item.slug }));
// }
export default async function ProductPage({ params }: ProductPageProps) {
  const product = await GetProduct(params.slug);

  return (
    <div className=" grid-cols-3">
      <div className="cols-span-2 overflow-hidden">
        <Image
          src="/"
          width={1000}
          height={1000}
          quality={100}
          alt="Camiseta DoWhile 2022"
        />
      </div>
      <div className="flex flex-col justify-center px-12">
        <h1 className="text-3x font-bold leading-tight">{product.title}</h1>
        <p className="mt-2 leading-relaxed text-zinc-400">
          {product.description}
        </p>
        <div className="flex items-center mt-8 gap-3">
          <span className=" inline-block rounded-full bg-violet-500 px-5 py-2.5 font-semibold">
            R$ {product.price}
          </span>
          <span className="text-sm text-zinc-400">
            em 12x sem juros de R$ {product.price / 12}
          </span>
        </div>

        <div className="mt-8 space-y-4">
          <span className="block font-semibold">Tamanhos</span>

          <div className="flex gap-2">
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              P
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              M
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              G
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              GG
            </button>
          </div>
        </div>
        <button
          type="button"
          className="mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white"
        >
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}
