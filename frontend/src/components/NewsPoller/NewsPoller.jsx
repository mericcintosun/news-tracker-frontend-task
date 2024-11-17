"use client";

import { useEffect, useState, useRef } from "react";

const NewsPoller = () => {
  const [latestNews, setLatestNews] = useState([]);
  const seenUrlsRef = useRef(new Set());
  const intervalRef = useRef(null);

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission !== "granted") {
          console.log("Bildirim izni verilmedi.");
        }
      });
    }
  }, []);

  useEffect(() => {
    if (intervalRef.current) {
      return;
    }

    const fetchNews = async () => {
      try {
        const res = await fetch("/api/news");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();

        if (data.articles && Array.isArray(data.articles)) {
          const newArticles = data.articles.filter(
            (article) => !seenUrlsRef.current.has(article.url)
          );

          if (newArticles.length > 0) {
            newArticles.forEach((article) => {
              if (Notification.permission === "granted") {
                const notification = new Notification(article.title, {
                  body: article.description || "Yeni bir haber var!",
                  icon: article.urlToImage || "/default-icon.png",
                  data: { url: article.url },
                });

                notification.onclick = () => {
                  window.open(article.url, "_blank");
                };
              }

              seenUrlsRef.current.add(article.url);
            });

            setLatestNews((prevNews) => {
              const updatedNews = [...newArticles, ...prevNews];
              return updatedNews.slice(0, 100);
            });
          }
        }
      } catch (error) {
        console.error("Haber Fetch Hatası:", error);
      }
    };

    fetchNews();

    intervalRef.current = setInterval(fetchNews, 30 * 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  return null;
};

export default NewsPoller;
