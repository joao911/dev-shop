import Image from "next/image";
import Link from "next/link";

export default async function Search() {
  return (
    <div className="flex flex-col gap-4">
      <p>
        Resultados para <span className="font-semibold">Moleton</span>
      </p>
      <div className="grid grid-cols-3 gap-6">
        <Link
          href={`/product/moleton-never-stop-learning`}
          className="relative group  rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
        >
          <Image
            src="/moletom-never-stop-learning.png"
            className="group-hover:scale-105 transition-transform duration-500"
            width={480}
            height={480}
            quality={100}
            alt=""
          />

          <div className="absolute rounded-full bottom-28 right-28 h-12 flex items-center gap-2 max-w-70 border-2 border-zinc-500 bg-black/60 p-1 pl-5">
            <span className="text-sm truncate">Moleton</span>
            <span className="flex w-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
              R$ 180
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
