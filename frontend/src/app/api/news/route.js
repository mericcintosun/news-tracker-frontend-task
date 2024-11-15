import axios from "axios";
import { NextResponse } from "next/server"; // Next.js yanıt oluşturma yardımcı fonksiyonu
import { filterArticles } from "@/lib/filterArticles"; // Filtreleme fonksiyonunuzu aynı şekilde kullanabilirsiniz

const API_KEY = process.env.NEXT_PUBLIC_NEWSAPI_KEY;

export async function GET(req) {
  const { searchParams } = new URL(req.url); // Gelen istek URL'sindeki parametreleri alır
  const category = searchParams.get("category") || "";
  const sources = searchParams.get("sources")?.split(",") || [];

  const params = {
    language: "en",
    apiKey: API_KEY,
  };

  if (sources.length > 0) {
    params.sources = sources.join(",");
  } else if (category) {
    params.category = category;
  }

  try {
    // Axios ile NewsAPI çağrısı
    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      params,
    });

    const articles = response.data.articles;

    // Filtreleme fonksiyonunuzu çağırabilirsiniz
    const filteredArticles = filterArticles(articles);

    return NextResponse.json({ articles: filteredArticles });
  } catch (error) {
    console.error("API Çağrısı Hatası:", error.message);

    // Hata durumunda JSON formatında yanıt döndürür
    return NextResponse.json(
      { error: "Haberler alınırken bir hata oluştu." },
      { status: 500 }
    );
  }
}
