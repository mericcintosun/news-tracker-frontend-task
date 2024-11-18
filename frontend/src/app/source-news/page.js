"use client";

// Import necessary dependencies and components
import { useState } from "react";
import NewsChart from "@/components/NewsChart/NewsChart";
import { useQuery } from "@tanstack/react-query";
import SourceNewsList from "@/components/SourceNewsList/SourceNewsList";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import "./SourceNewsPage.css";

// List of news sources used for filtering articles
const sources = [
  "bbc-news",
  "cnn",
  "the-new-york-times",
  "the-guardian-uk",
  "reuters",
  "al-jazeera-english",
  "fox-news",
  "bloomberg",
  "associated-press",
  "the-washington-post",
];

// Fetch news articles from the server based on the selected source
const fetchSourceNews = async (source) => {
  const res = await fetch(`/api/news?sources=${source}`);
  if (!res.ok) {
    // Throw an error if the response is not successful
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data.articles;
};

export default function SourceNewsPage() {
  // State to track the currently selected news source
  const [activeSource, setActiveSource] = useState(sources[0]);

  // Use React Query to fetch and cache news articles
  const { data, isLoading, error } = useQuery({
    queryKey: ["news", activeSource],
    queryFn: () => fetchSourceNews(activeSource),
    staleTime: 1000 * 60 * 5, // Cache validity set to 5 minutes
    refetchOnWindowFocus: false, // Disable automatic refetching when the window regains focus
  });

  return (
    <div
      className="source-news-container"
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Show loading spinner while fetching data */}
      {isLoading && <LoadingSpinner />}

      {/* Display error message if the fetch fails */}
      {error && (
        <p
          style={{
            textAlign: "center",
            color: "red",
            fontSize: "1rem",
            margin: "10px 0",
          }}
        >
          An error occurred: {error.message}
        </p>
      )}

      {/* Render the NewsChart component if data is successfully fetched */}
      {data && (
        <NewsChart
          articles={data}
          style={{
            padding: "15px",
            borderRadius: "5px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            maxWidth: "100%",
          }}
        />
      )}

      {/* Page title */}
      <h1
        style={{
          textAlign: "center",
          fontSize: "2rem",
          margin: "20px 0",
        }}
      >
        Latest News by Source
      </h1>

      {/* Navigation bar for selecting news sources */}
      <nav
        className="navbar"
        style={{
          width: "100%",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <ul
          className="navbar-list"
          style={{
            display: "flex",
            flexWrap: "wrap",
            listStyle: "none",
            padding: "0",
            gap: "10px",
          }}
        >
          {sources.map((source) => (
            <li
              key={source}
              className={`navbar-item`}
              style={{
                padding: "10px 15px",
                borderRadius: "5px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
                backgroundColor:
                  activeSource === source ? "#0070f3" : "transparent",
                color: activeSource === source ? "#fff" : "#555",
                fontWeight: activeSource === source ? "bold" : "normal",
              }}
              onClick={() => setActiveSource(source)}
            >
              {/* Format the source name for better readability */}
              {source
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </li>
          ))}
        </ul>
      </nav>

      {/* Render the list of articles for the selected source */}
      <SourceNewsList
        source={activeSource}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
          padding: "20px",
          width: "100%",
          maxWidth: "1200px",
        }}
      />
    </div>
  );
}
