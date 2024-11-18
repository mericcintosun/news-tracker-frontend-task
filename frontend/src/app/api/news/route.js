import axios from "axios";
import { NextResponse } from "next/server";
import { filterArticles } from "@/lib/filterArticles";

/**
 * Handles the GET request to fetch top headlines from the NewsAPI.
 * It handles category and source filtering, fetches data from the NewsAPI,
 * filters the results, and returns the processed news articles.
 *
 * @param {Request} req - The incoming request object.
 * @returns {NextResponse} - The response containing the articles or an error message.
 */
export async function GET(req) {
  const API_KEY = process.env.NEWSAPI_KEY;

  // Check if the API key is available in environment variables
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

  // Extract search parameters from the request URL
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") || ""; // Category filter (optional)
  const sources = searchParams.get("sources")?.split(",") || []; // Sources filter (optional)

  // Set up parameters for the API request
  const params = {
    language: "en", // Request in English
    apiKey: API_KEY, // API key from environment variables
  };

  // If sources are provided, add them to the request parameters
  if (sources.length > 0) {
    params.sources = sources.join(",");
  } else if (category) {
    // If category is provided, add it to the request parameters
    params.category = category;
  }

  try {
    // Fetch top headlines from NewsAPI
    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      params,
      timeout: 5000, // Set timeout to 5 seconds
    });

    // Ensure response data contains articles and filter them
    const articles = Array.isArray(response.data.articles)
      ? response.data.articles
      : [];

    // Filter the articles using a custom filter function
    const filteredArticles = filterArticles(articles);

    // Return the filtered articles in the response
    return NextResponse.json({ articles: filteredArticles });
  } catch (error) {
    // Log error details if something goes wrong
    console.error("Error Response Data:", error.response?.data || error);
    console.error("Full Error Details:", error.message || error);

    // Return an error response with details
    return NextResponse.json(
      { error: "Haberler alınırken bir hata oluştu.", details: error.message },
      { status: 500 }
    );
  }
}
