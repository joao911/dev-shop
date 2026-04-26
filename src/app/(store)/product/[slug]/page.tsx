import { api } from "@/data/api";
import { Product } from "@/data/types/products";
import { Metadata } from "next";
import Image from "next/image";
interface productParams {
  params: {
    slug: string;
  };
}

async function GetProduct(slug: string): Promise<Product> {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 5, // 1 hora para revalidar,
    },
  });
  const products = await response.json();
  return products;
}

export async function generateMetadata({
  params,
}: productParams): Promise<Metadata> {
  const { slug } = await params;

  const product = await GetProduct(slug);
  return {
    title: `${product.title}`,
  };
}

export function generateStaticParams() {
  return [
    { slug: "moletom-never-stop-learning" },
    { image: "/moletom-never-stop-learning.png" },
    { title: "Moletom Never Stop Learning" },
    { price: 129 },
  ];
}

export default async function PageProduct({ params }: productParams) {
  const { slug } = await params;

  const product = await GetProduct(slug);

  console.log("product", product);

  return (
    <div className="relative grid max-h-215 grid-cols-3">
      <div className="col-span-2 overflow-hidden">
        <Image
          src={product.image}
          alt="imagem"
          width={1000}
          height={1000}
          quality={100}
        />
      </div>
      <div className="flex flex-col justify-center px-12">
        <h1 className="text-3xl font-bold leading-tight">{product.title}</h1>
        <p className="mt-2 leading-relaxed text-zinc-400">
          {product.description}
        </p>
        <div className="mt-8 flex items-center gap-3">
          <span className="inline-block p-2 rounded-full bg-violet-500 px-5py-2.5 font-semibold">
            R$ {product.price}
          </span>
          <span className="text-small text-zinc-400">
            Em 12 s/ juros de R$ {product.price / 12}
          </span>
        </div>
        <div className="mt-8 space-y-4 ">
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
