import { generateNews } from "@/lib/ai";

export default async function NewsPage() {
  const object = await generateNews("SVT latest news");
  return (
    <div className=" container h-screen  mx-auto p-4 mt-6">
      <div className="flex flex-col mx-auto bg-amber-200 text-xl p-4">
        <h1 className="text-3xl font-extrabold text-red-600 m-4">{object.title}</h1>
        <p className="text-black text-xl">{object.content}</p>
        <p className="text-xl mt-4 text-blue-600">{object.summary}</p>
      </div>
    </div>
  );
}
