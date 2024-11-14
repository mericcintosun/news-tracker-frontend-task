"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNews } from "@/lib/fetchNews";

export default function CategoryNewsList({ category }) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["news", category],
    queryFn: () => fetchNews({ category }),
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
          </li>
        ))}
      </ul>
    </div>
  );
}
