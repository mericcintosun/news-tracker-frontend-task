"use client";

import { useState } from "react";
import NewsChart from "@/components/NewsChart/NewsChart";
import { useQuery } from "@tanstack/react-query";
import SourceNewsList from "@/components/SourceNewsList/SourceNewsList";
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
    <div className="source-news-container flex-center padding-all">
      {isLoading && <p className="loading-text text-center">Yükleniyor...</p>}
      {error && (
        <p className="error-text text-center">
          Bir hata oluştu: {error.message}
        </p>
      )}
      {data && (
        <NewsChart
          articles={data}
          className="source-news-chart rounded shadow-md padding-all max-width"
        />
      )}

      <h1 className="source-news-heading text-center">
        Kaynağa Göre En Son Haberler
      </h1>

      <nav className="navbar flex-row gap-16 padding-vertical">
        <ul className="navbar-list flex-row gap-16">
          {sources.map((source) => (
            <li
              key={source}
              className={`navbar-item rounded-sm shadow-sm padding-horizontal ${
                activeSource === source ? "active text-primary" : "text-muted"
              }`}
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
        className="source-news-list flex-row-wrap padding-all"
      />
    </div>
  );
}
