"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
export default function CategoryNewsList({ category }) {
  const fetchCategoryNews = async () => {
    const params = new URLSearchParams({ category });
    const res = await fetch(`/api/news?${params.toString()}`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("Veri alınamadı");
    }

    const data = await res.json();
    return data.articles;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["news", category],
    queryFn: fetchCategoryNews,
    staleTime: 1000 * 60 * 60 * 10,
  });

  if (isLoading) return <p>{category} haberleri yükleniyor...</p>;
  if (error)
    return (
      <p>
        {category} haberleri yüklenirken bir hata oluştu: {error.message}
      </p>
    );

  return (
    <div>
      <h3>{category.toUpperCase()}</h3>
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
