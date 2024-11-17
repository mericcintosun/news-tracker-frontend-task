"use client";

import { useState } from "react";
import NewsChart from "@/components/NewsChart/NewsChart";
import { useQuery } from "@tanstack/react-query";
import SourceNewsList from "@/components/SourceNewsList/SourceNewsList";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import "./SourceNewsPage.css";

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

const fetchSourceNews = async (source) => {
  const res = await fetch(`/api/news?sources=${source}`);
  if (!res.ok) {
    throw new Error("Veri alınamadı");
  }
  const data = await res.json();
  return data.articles;
};

export default function SourceNewsPage() {
  const [activeSource, setActiveSource] = useState(sources[0]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["news", activeSource],
    queryFn: () => fetchSourceNews(activeSource),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
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
      {isLoading && <LoadingSpinner />}
      {error && (
        <p
          style={{
            textAlign: "center",
            color: "red",
            fontSize: "1rem",
            margin: "10px 0",
          }}
        >
          Bir hata oluştu: {error.message}
        </p>
      )}
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

      <h1
        style={{
          textAlign: "center",
          fontSize: "2rem",
          margin: "20px 0",
        }}
      >
        Kaynağa Göre En Son Haberler
      </h1>

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
              {source
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </li>
          ))}
        </ul>
      </nav>

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
