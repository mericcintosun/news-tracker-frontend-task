"use client";

import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import NewsChart from "@/components/NewsChart/NewsChart";
import NewsPoller from "@/components/NewsPoller/NewsPoller";
import NotificationPermission from "@/components/NotificationPermission/NotificationPermission";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
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
      <div
        className="news-container"
        style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}
      >
        <NotificationPermission
          style={{
            padding: "15px",
            borderRadius: "5px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        />

        {data && (
          <NewsChart
            articles={data}
            style={{
              padding: "15px",
              borderRadius: "5px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              maxWidth: "100%",
            }}
          />
        )}

        <h1 style={{ textAlign: "center", fontSize: "2rem", margin: "20px 0" }}>
          Yeni Haberler
        </h1>

        <NewsPoller
          style={{
            padding: "15px",
            borderRadius: "5px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        />

        <h2
          style={{ textAlign: "center", fontSize: "1.5rem", margin: "20px 0" }}
        >
          En Son Haberler
        </h2>

        {isLoading && <LoadingSpinner />}
        {error && (
          <p style={{ textAlign: "center", fontSize: "1rem" }}>
            Bir hata oluştu: {error.message}
          </p>
        )}

        {data && (
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              padding: "0",
            }}
          >
            {data.map((article, index) => (
              <li
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  padding: "15px",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Link
                  href={article.url}
                  className="news-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                >
                  {article.title}
                </Link>
                <p className="news-description" style={{ fontSize: "1rem", lineHeight: "1.5" }}>
                  {article.description}
                </p>
                <p className="news-author" style={{ fontSize: "0.9rem" }}>
                  Yazar: {article.author || "Bilinmiyor"}
                </p>
                <p className="news-date" style={{ fontSize: "0.9rem" }}>
                  Yayınlanma Tarihi:{" "}
                  {new Date(article.publishedAt).toLocaleDateString("tr-TR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p className="news-source" style={{ fontSize: "0.9rem" }}>
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
                <p style={{ fontSize: "1rem", lineHeight: "1.5" }}>
                  {article.content?.split(" [+")[0]}{" "}
                  <Link
                  className="news-link"
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                  >
                    Devamını oku
                  </Link>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
