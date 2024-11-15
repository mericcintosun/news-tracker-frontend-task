import axios from "axios";
import { NextResponse } from "next/server";
import { filterArticles } from "@/lib/filterArticles";

const API_KEY = process.env.NEXT_PUBLIC_NEWSAPI_KEY;

export async function GET(req) {
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

  console.log("Request Params:", params);

  try {
    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      params,
      timeout: 5000,  
    });

    const articles = response.data.articles;
    const filteredArticles = filterArticles(articles);

    return NextResponse.json({ articles: filteredArticles });
  } catch (error) {
    console.error("Error Response Data:", error);
    console.error("Full Error Details:", error.response?.data || error);

    return NextResponse.json(
      { error: "Haberler alınırken bir hata oluştu.", details: error.message },
      { status: 500 }
    );
  }
}
