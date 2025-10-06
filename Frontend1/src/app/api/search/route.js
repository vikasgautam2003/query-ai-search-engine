





// import { NextResponse } from 'next/server';

// export async function POST(request) {
//   try {
//     const { query } = await request.json();

//     const SERPAPI_KEY = process.env.SERPAPI_API_KEY;
//     if (!SERPAPI_KEY) throw new Error("SERPAPI_API_KEY is not set");

//     // 1️⃣ Web Search
//     const serpResponse = await fetch(`https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(query)}&api_key=${SERPAPI_KEY}`);
//     if (!serpResponse.ok) throw new Error(`SerpApi request failed: ${serpResponse.statusText}`);
//     const serpData = await serpResponse.json();

//     const sources = (serpData.organic_results || []).slice(0, 8).map(item => ({
//       title: item.title,
//       link: item.link,
//       snippet: item.snippet,
//       favicon: item.favicon
//     }));

   
//     const serpImageResponse = await fetch(`https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(query)}&tbm=isch&api_key=${SERPAPI_KEY}`);
//     if (!serpImageResponse.ok) throw new Error(`SerpApi image request failed: ${serpImageResponse.statusText}`);
//     const serpImageData = await serpImageResponse.json();

//     // const images = (serpImageData.images_results || []).slice(0, 6).map(item => ({
//     //   imageUrl: `/api/image-proxy?url=${encodeURIComponent(item.original || item.thumbnail)}`,
//     //   thumbnailUrl: `/api/image-proxy?url=${encodeURIComponent(item.thumbnail || item.original)}`,
//     //   source: item.link ? new URL(item.link).hostname.replace('www.', '') : ""
//     // }));


//     const images = (serpImageData.images_results || []).slice(0, 6).map(item => ({
//       imageUrl: `/api/image-proxy?url=${encodeURIComponent(item.original)}`,
//       thumbnailUrl: `/api/image-proxy?url=${encodeURIComponent(item.thumbnail)}`,
//       link: item.link || "", // the actual webpage the image is from
//       source: item.source || (item.link ? new URL(item.link).hostname.replace('www.', '') : "")
//     }));


    


//     const relatedQuestions = (serpData.related_questions || []).map(item => item.question).slice(0, 5);

  
//     const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
//     if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY is not set");

//     const context = sources.map((source, index) => `[${index + 1}] (${source.link}): ${source.snippet}`).join('\n');
//     const prompt = `Based on the provided web search context, please provide a comprehensive, multi-paragraph answer to the user's query. Respond in well-structured markdown. Cite the sources using [1], [2], etc., at the end of the relevant sentences.\n\nContext:\n${context}\n\nUser Query: ${query}\n\nAnswer:`;

//     const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${GEMINI_API_KEY}`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
//     });

//     if (!geminiResponse.ok) throw new Error(`Gemini API request failed: ${geminiResponse.statusText}`);

//     const geminiData = await geminiResponse.json();
//     const answer = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate an answer.";

    
//     return NextResponse.json({ answer, sources, images, relatedQuestions });

//   } catch (error) {
//     console.error('API Route Error:', error.message);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }












import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { query, searchType } = await request.json();

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const SERPAPI_KEY = process.env.SERPAPI_API_KEY;
    if (!SERPAPI_KEY) throw new Error("SERPAPI_API_KEY is not set");

    const engine = searchType === "Research" ? "google_scholar" : "google";

    console.log(`🔍 Search type: ${searchType}`);
    console.log(`🌐 Using SerpAPI engine: ${engine}`);
    console.log(`📝 Query: ${query}`);

    const serpResponse = await fetch(
      `https://serpapi.com/search.json?engine=${engine}&q=${encodeURIComponent(query)}&api_key=${SERPAPI_KEY}`
    );
    if (!serpResponse.ok) throw new Error(`SerpApi request failed: ${serpResponse.statusText}`);
    const serpData = await serpResponse.json();

    console.log("📄 SerpAPI Data:", serpData);

    const sources = (serpData.organic_results || []).slice(0, 8).map(item => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet,
      favicon: item.favicon
    }));

    const serpImageResponse = await fetch(
      `https://serpapi.com/search.json?engine=${engine}&q=${encodeURIComponent(query)}&tbm=isch&api_key=${SERPAPI_KEY}`
    );
    if (!serpImageResponse.ok) throw new Error(`SerpApi image request failed: ${serpImageResponse.statusText}`);
    const serpImageData = await serpImageResponse.json();

    console.log("🖼️ SerpAPI Images Data:", serpImageData);

    const images = (serpImageData.images_results || []).slice(0, 6).map(item => ({
      imageUrl: `/api/image-proxy?url=${encodeURIComponent(item.original)}`,
      thumbnailUrl: `/api/image-proxy?url=${encodeURIComponent(item.thumbnail)}`,
      link: item.link || "",
      source: item.source || (item.link ? new URL(item.link).hostname.replace('www.', '') : "")
    }));

    const relatedQuestions = (serpData.related_questions || []).map(item => item.question).slice(0, 5);

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY is not set");

    const context = sources
      .map((source, index) => `[${index + 1}] (${source.link}): ${source.snippet}`)
      .join('\n');

    const promptTemplate =
      searchType === "Research"
        ? `Act as a formal research assistant. Based on the provided academic context, provide a detailed, in-depth explanation of the user's query. Structure your answer clearly and use a formal, academic tone. Cite sources using [1], [2], etc.`
        : `Based on the provided web search context, please provide a comprehensive, multi-paragraph answer to the user's query. Respond in well-structured markdown. Cite the sources using [1], [2], etc., at the end of the relevant sentences.`;

    const prompt = `${promptTemplate}\n\nContext:\n${context}\n\nUser Query: ${query}\n\nAnswer:`;

    console.log("✏️ Prompt to Gemini:", prompt);

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      }
    );

    if (!geminiResponse.ok) throw new Error(`Gemini API request failed: ${geminiResponse.statusText}`);

    const geminiData = await geminiResponse.json();
    const answer = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate an answer.";

    console.log("💡 Gemini Answer:", answer);

    return NextResponse.json({ answer, sources, images, relatedQuestions });

  } catch (error) {
    console.error('API Route Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

