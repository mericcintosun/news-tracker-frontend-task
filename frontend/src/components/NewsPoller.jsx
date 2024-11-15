// components/NewsPoller.js

"use client";

import { useEffect, useState, useRef } from "react";

const NewsPoller = () => {
  const [latestNews, setLatestNews] = useState([]);
  const latestNewsRef = useRef(latestNews);
  const intervalRef = useRef(null); // Interval'ın sadece bir kez kurulmasını sağlamak için

  // latestNews güncellendiğinde ref'i güncelle
  useEffect(() => {
    latestNewsRef.current = latestNews;
  }, [latestNews]);

  useEffect(() => {
    // Eğer interval zaten kurulmuşsa, tekrar kurmayın
    if (intervalRef.current) {
      return;
    }

    // Bildirim izni kontrolü ve isteme
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission !== "granted") {
          console.log("Bildirim izni verilmedi.");
        }
      });
    }

    const fetchNews = async () => {
      try {
        console.log("Fetching news..."); // Debug log
        const res = await fetch("/api/news?category=technology");
        const data = await res.json();

        if (data.articles) {
          console.log("Fetched articles:", data.articles); // Debug log
          const newArticles = data.articles.filter(
            (article) =>
              !latestNewsRef.current.some((news) => news.url === article.url)
          );

          console.log("New articles:", newArticles); // Debug log

          if (newArticles.length > 0) {
            newArticles.forEach((article) => {
              // Bildirim izni kontrolü
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
            });

            setLatestNews(data.articles);
          }
        }
      } catch (error) {
        console.error("Haber Fetch Hatası:", error);
      }
    };

    // İlk fetch
    fetchNews();

    // Her 15 dakikada bir fetch
    intervalRef.current = setInterval(fetchNews, 15 * 60 * 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []); // Bağımlılık dizisi boş

  return null;
};

export default NewsPoller;
