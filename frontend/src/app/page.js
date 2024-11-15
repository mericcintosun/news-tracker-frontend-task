"use client";

import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const fetchLatestNews = async () => {
    const res = await fetch(`/api/news`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("Veri alınamadı");
    }

    const data = await res.json();
    return data.articles; // route.js tarafından dönen `articles` verisi
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["news", "latest"],
    queryFn: fetchLatestNews,
    staleTime: 1000 * 60 * 60 * 10, // 10 saat boyunca önbellek tutma
  });

  return (
    <>
      <div>
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
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
