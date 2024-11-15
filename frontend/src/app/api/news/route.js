import axios from "axios";
import { NextResponse } from "next/server";
import { filterArticles } from "@/lib/filterArticles";

export async function GET(req) {
  const API_KEY = process.env.NEWSAPI_KEY;

  if (!API_KEY) {
    console.error("NEWSAPI_KEY ortam değişkeni bulunamadı.");
    return NextResponse.json(
      { error: "API anahtarı eksik." },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const { searchParams } = new URL(req.url);
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
    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      params,
      timeout: 5000,
    });

    const articles = Array.isArray(response.data.articles)
      ? response.data.articles
      : [];

    const filteredArticles = filterArticles(articles);

    return NextResponse.json({ articles: filteredArticles });
  } catch (error) {
    console.error("Error Response Data:", error.response?.data || error);
    console.error("Full Error Details:", error.message || error);

    return NextResponse.json(
      { error: "Haberler alınırken bir hata oluştu.", details: error.message },
      { status: 500 }
    );
  }
}
