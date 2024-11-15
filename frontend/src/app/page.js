"use client";

import NewsChart from "@/components/NewsChart/NewsChart";
import NewsPoller from "@/components/NewsPoller/NewsPoller";
import NotificationPermission from "@/components/NotificationPermission/NotificationPermission";
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
      <div className="news-container padding-all flex-center">
        <NotificationPermission className="notification-permission padding-all rounded shadow-md" />

        {data && (
          <NewsChart
            articles={data}
            className="news-chart rounded shadow-md padding-all max-width"
          />
        )}

        <h1 className="headline text-center">Yeni Haberler</h1>

        <NewsPoller className="news-poller rounded shadow-md padding-all" />

        <h2 className="subheadline text-center">En Son Haberler</h2>

        {isLoading && <p className="loading-text text-center">Yükleniyor...</p>}
        {error && (
          <p className="error-text text-center">
            Bir hata oluştu: {error.message}
          </p>
        )}

        {data && (
          <ul className="news-list flex-column gap-16">
            {data.map((article, index) => (
              <li
                key={index}
                className="news-item flex-row gap-16 rounded-sm shadow-sm padding-all"
              >
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="news-link text-primary"
                >
                  {article.title}
                </a>
                <p className="news-description text-muted">
                  {article.description}
                </p>
                <p className="news-author text-muted">{article.author}</p>
                <p className="news-date text-muted">
                  Yayınlanma Tarihi:{" "}
                  {new Date(article.publishedAt).toLocaleDateString("tr-TR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p className="news-source text-muted">{article.source.name}</p>
                <Image
                  src={article.urlToImage}
                  alt={article.title}
                  width={200}
                  height={200}
                  className="news-image rounded-sm"
                />
                <p className="news-content text-muted">
                  {article.content?.split(" [+")[0]}{" "}
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="continue-reading text-primary"
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
