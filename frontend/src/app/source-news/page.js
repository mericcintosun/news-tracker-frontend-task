"use client";

import { useState } from "react";
import NewsChart from "@/components/NewsChart/NewsChart";
import { useQuery } from "@tanstack/react-query";
import SourceNewsList from "@/components/SourceNewsList";

// Haber kaynakları
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

// Kaynağa göre haberleri API'den çeken fonksiyon
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

  // Haberleri React Query ile çekiyoruz
  const { data, isLoading, error } = useQuery({
    queryKey: ["news", activeSource],
    queryFn: () => fetchSourceNews(activeSource),
    staleTime: 1000 * 60 * 5, // 5 dakika boyunca önbellekte saklar
    refetchOnWindowFocus: false, // Sayfa odaklandığında tekrar sorgu yapmaz
  });

  return (
    <div>
      {/* Grafik */}
      {isLoading && <p>Yükleniyor...</p>}
      {error && <p>Bir hata oluştu: {error.message}</p>}
      {data && <NewsChart articles={data} />}

      {/* Sayfa Başlığı */}
      <h1>Kaynağa Göre En Son Haberler</h1>

      {/* Kaynak Seçimi Menüsü */}
      <nav className="navbar">
        <ul className="navbar-list">
          {sources.map((source) => (
            <li
              key={source}
              className={`navbar-item ${
                activeSource === source ? "active" : ""
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

      {/* Haber Listesi */}
      <SourceNewsList source={activeSource} />
    </div>
  );
}
