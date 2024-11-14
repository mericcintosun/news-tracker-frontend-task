"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNews } from "@/lib/fetchNews";

export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["news", "latest"],
    queryFn: () => fetchNews(),
    staleTime: 1000 * 60 * 60 * 10, 
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
