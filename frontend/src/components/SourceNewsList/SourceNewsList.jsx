"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import styles from "./SourceNewsList.module.css";
import Link from "next/link";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
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

  if (isLoading) return <LoadingSpinner />;

  if (error)
    return (
      <p className={styles.errorMessage}>
        {source} haberleri yüklenirken bir hata oluştu: {error.message}
      </p>
    );

  return (
    <div className={styles.sourceNewsContainer}>
      <h3 className={styles.sourceTitle}>{source.toUpperCase()}</h3>
      <ul className={styles.sourceNewsList}>
        {data.map((article, index) => (
          <li key={index} className={styles.sourceNewsItem}>
            <Link
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.sourceNewsLink}
            >
              {article.title}
            </Link>
            <p className={styles.sourceNewsDescription}>
              {article.description}
            </p>
            <p className={styles.sourceNewsAuthor}>{article.author}</p>
            <p className={styles.sourceNewsPublishedDate}>
              Yayınlanma Tarihi:{" "}
              {new Date(article.publishedAt).toLocaleDateString("tr-TR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p className={styles.sourceNewsSource}>{article.source.name}</p>
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
          </li>
        ))}
      </ul>
    </div>
  );
}
