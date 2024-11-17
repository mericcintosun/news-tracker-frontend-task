"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import styles from "./CategoryNewsList.module.css";
import Link from "next/link";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
export default function CategoryNewsList({ category }) {
  const fetchCategoryNews = async () => {
    const params = new URLSearchParams({ category });
    const res = await fetch(`/api/news?${params.toString()}`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error(`${category} haberleri yüklenirken bir hata oluştu`);
    }

    const data = await res.json();
    return data.articles;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["news", category],
    queryFn: fetchCategoryNews,
    staleTime: 1000 * 60 * 60 * 10,
  });

  if (isLoading) return <LoadingSpinner />;

  if (error) return <p>{error.message}</p>;

  return (
    <div className={styles.categoryArticleContainer}>
      <h3 className={styles.categoryTitle}>
        {category.charAt(0).toUpperCase() + category.slice(1)} Haberleri
      </h3>

      <ul className={styles.articleList}>
        {data.map((article) => (
          <li key={article.url} className={styles.articleItem}>
            <Link
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.articleLink}
            >
              {article.title}
            </Link>
            <p className={styles.articleDescription}>{article.description}</p>
            <p className={styles.articleAuthor}>
              Yazar: {article.author || "Bilinmiyor"}
            </p>
            <p className={styles.articleDate}>
              Yayınlanma Tarihi:{" "}
              {new Date(article.publishedAt).toLocaleDateString("tr-TR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p className={styles.articleSource}>
              Kaynak: {article.source.name}
            </p>

            {article.urlToImage && (
              <Image
                src={article.urlToImage}
                alt={article.title}
                width={400}
                height={250}
                style={{
                  borderRadius: "5px",
                  objectFit: "cover",
                  width: "100%",
                  height: "auto",
                }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
