"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import styles from "./SourceNewsList.module.css";
import Link from "next/link";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

/**
 * SourceNewsList Component
 * This component fetches and displays news articles from a specified news source.
 * It uses React Query for data fetching and error/loading handling.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.source - The news source (e.g., "bbc-news", "cnn").
 * @returns {JSX.Element} - The rendered SourceNewsList component.
 */
export default function SourceNewsList({ source }) {
  // Function to fetch news articles based on the provided source
  const fetchNews = async () => {
    const params = new URLSearchParams({ sources: source }); // Add source as a query parameter
    const res = await fetch(`/api/news?${params.toString()}`);
    if (!res.ok) throw new Error("Veri alınamadı"); // Handle failed fetch
    const data = await res.json();
    return data.articles; // Return the articles from the response
  };

  // Using React Query to fetch news data, with error and loading states
  const { data, error, isLoading } = useQuery({
    queryKey: ["news", source], // Use the source as the query key to cache data
    queryFn: fetchNews, // Function to fetch news
    staleTime: 1000 * 60 * 60 * 10, // Cache data for 10 hours
  });

  // Display a loading spinner while the news is being fetched
  if (isLoading) return <LoadingSpinner />;

  // Display an error message if the news fetch fails
  if (error)
    return (
      <p className={styles.errorMessage}>
        {source} haberleri yüklenirken bir hata oluştu: {error.message}
      </p>
    );

  return (
    <div className={styles.sourceNewsContainer}>
      {/* Display the title of the news source */}
      <h3 className={styles.sourceTitle}>{source.toUpperCase()}</h3>

      {/* Render the list of news articles */}
      <ul className={styles.sourceNewsList}>
        {data.map((article, index) => (
          <li key={index} className={styles.sourceNewsItem}>
            {/* Link to the article */}
            <Link
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.sourceNewsLink}
            >
              {article.title}
            </Link>

            {/* Article description */}
            <p className={styles.sourceNewsDescription}>
              {article.description}
            </p>

            {/* Article author */}
            <p className={styles.sourceNewsAuthor}>{article.author}</p>

            {/* Article published date */}
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

            {/* Article source */}
            <p className={styles.sourceNewsSource}>{article.source.name}</p>

            {/* Article image (if available) */}
            <Image
              src={article.urlToImage}
              alt={article.title}
              width={400}
              height={250}
              style={{
                borderRadius: "5px", // Rounded corners for the image
                objectFit: "cover", // Ensures image fits within the container
                width: "100%", // Full width for the image
                height: "auto", // Auto-adjust height
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
