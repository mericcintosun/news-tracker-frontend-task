"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import styles from "./CategoryNewsList.module.css";
import Link from "next/link";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

/**
 * CategoryNewsList Component
 * This component fetches and displays a list of news articles based on the given category.
 * It uses React Query for data fetching and manages loading and error states.
 *
 * @param {Object} props - Component's props
 * @param {string} props.category - The news category (e.g., "technology", "business")
 * @returns {JSX.Element} - The rendered CategoryNewsList component
 */
export default function CategoryNewsList({ category }) {
  // Function to fetch news articles based on category
  const fetchCategoryNews = async () => {
    const params = new URLSearchParams({ category });
    const res = await fetch(`/api/news?${params.toString()}`, {
      method: "GET",
    });

    // Check if the request was successful, else throw an error
    if (!res.ok) {
      throw new Error(`${category} haberleri yüklenirken bir hata oluştu`);
    }

    const data = await res.json();
    return data.articles;
  };

  // Use React Query to fetch data and handle loading and error states
  const { data, error, isLoading } = useQuery({
    queryKey: ["news", category],
    queryFn: fetchCategoryNews,
    staleTime: 1000 * 60 * 60 * 10, // Cache data for 10 hours
  });

  // Show loading spinner while data is being fetched
  if (isLoading) return <LoadingSpinner />;

  // Show error message if an error occurs
  if (error) return <p>{error.message}</p>;

  return (
    <div className={styles.categoryArticleContainer}>
      {/* Display category title */}
      <h3 className={styles.categoryTitle}>
        {category.charAt(0).toUpperCase() + category.slice(1)} Haberleri
      </h3>

      <ul className={styles.articleList}>
        {/* Map over articles and render each one */}
        {data.map((article) => (
          <li key={article.url} className={styles.articleItem}>
            {/* Link to the article's URL */}
            <Link
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.articleLink}
            >
              {article.title}
            </Link>
            {/* Article description */}
            <p className={styles.articleDescription}>{article.description}</p>
            {/* Author name (fallback to "Bilinmiyor" if not available) */}
            <p className={styles.articleAuthor}>
              Yazar: {article.author || "Bilinmiyor"}
            </p>
            {/* Article publication date formatted to Turkish */}
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
            {/* Article source */}
            <p className={styles.articleSource}>
              Kaynak: {article.source.name}
            </p>

            {/* Display image if available */}
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
