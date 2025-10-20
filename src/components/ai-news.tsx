import { generateNewsObject } from "@/lib/ai";




export default async function  NewsPage (){
    const topic = "climate changes";
    const article = await generateNewsObject(topic);
    
    return (

        <main className="max-w-2xl mx-auto p-6 border shadow-2xl">
        <h3 className="text-2xl font-bold mb-4">{article.title}</h3>
        <p className="text-gray-200 mb-2">{article.summary}</p>
        <div className="text-gray-500 whitespace-pre-line">{article.content}</div>
        
        </main>
    );

}


