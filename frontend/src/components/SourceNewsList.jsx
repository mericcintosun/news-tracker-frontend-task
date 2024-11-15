"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function SourceNewsList({ source }) {
  const fetchNews = async () => {
    const params = new URLSearchParams({ sources: source });
    const res = await fetch(`/api/news?${params.toString()}`);
    if (!res.ok) throw new Error("Veri alınamadı");
    const data = await res.json();
    return data.articles;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["news", source],
    queryFn: fetchNews,
    staleTime: 1000 * 60 * 60 * 10,
  });

  if (isLoading) return <p>{source} haberleri yükleniyor...</p>;
  if (error)
    return (
      <p>
        {source} haberleri yüklenirken bir hata oluştu: {error.message}
      </p>
    );

  return (
    <div>
      <h3>{source.toUpperCase()}</h3>
      <ul>
        {data.map((article, index) => (
          <li key={index}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
            <p>{article.description}</p>
            <p>{article.author}</p>
            <p>
              Yayınlanma Tarihi:{" "}
              {new Date(article.publishedAt).toLocaleDateString("tr-TR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p>{article.source.name}</p>
            <p>{article.urlToImage}</p>
            <Image
              src={article.urlToImage}
              alt={article.title}
              width={200}
              height={200}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
