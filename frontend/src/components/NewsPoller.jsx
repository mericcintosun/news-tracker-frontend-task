// components/NewsPoller.js

"use client";

import { useEffect, useState, useRef } from "react";

const NewsPoller = () => {
  const [latestNews, setLatestNews] = useState([]);
  const seenUrlsRef = useRef(new Set()); // Bildirim gönderilmiş haberlerin URL'lerini saklar
  const intervalRef = useRef(null); // Interval'ın sadece bir kez kurulmasını sağlamak için

  useEffect(() => {
    // Bildirim izni kontrolü ve isteme
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission !== "granted") {
          console.log("Bildirim izni verilmedi.");
        }
      });
    }
  }, []);

  useEffect(() => {
    // Eğer interval zaten kurulmuşsa, tekrar kurmayın
    if (intervalRef.current) {
      return;
    }

    const fetchNews = async () => {
      try {
        console.log("Fetching news..."); // Debug log
        const res = await fetch("/api/news?category=technology");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();

        if (data.articles && Array.isArray(data.articles)) {
          console.log("Fetched articles:", data.articles); // Debug log

          // Yeni haberleri tespit et
          const newArticles = data.articles.filter(
            (article) => !seenUrlsRef.current.has(article.url)
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

              // Bildirim gönderilmiş URL'yi ekle
              seenUrlsRef.current.add(article.url);
            });

            // `latestNews` durumunu güncelle (isteğe bağlı, UI için kullanılabilir)
            setLatestNews((prevNews) => {
              // Yeni haberleri önce ekleyip, eski haberleri sınırlayabilirsiniz
              const updatedNews = [...newArticles, ...prevNews];
              // Örneğin, en fazla 100 haberi saklayabilirsiniz
              return updatedNews.slice(0, 100);
            });
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
