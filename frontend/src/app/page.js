"use client";

import NewsPoller from "@/components/NewsPoller";
import NotificationPermission from "@/components/NotificationPermission";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function Home() {
  const fetchLatestNews = async () => {
    const res = await fetch(`/api/news`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("Veri alınamadı");
    }

    const data = await res.json();
    return data.articles;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["news", "latest"],
    queryFn: fetchLatestNews,
    staleTime: 1000 * 60 * 60 * 10,
  });

  return (
    <>
      <div>
        <NotificationPermission />
        <h1>Yeni Haberler</h1>

        <NewsPoller />
        <h2>En Son Haberler</h2>
        {isLoading && <p>Yükleniyor...</p>}
        {error && <p>Bir hata oluştu: {error.message}</p>}
        {data && (
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
                <p>
                  {article.content?.split(" [+")[0]}{" "}
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Devamını oku
                  </a>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
