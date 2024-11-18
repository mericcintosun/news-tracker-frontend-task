"use client";

import { useEffect, useState, useRef } from "react";

/**
 * NewsPoller Component
 * This component polls news articles every 30 seconds and displays notifications for new articles.
 * It also handles the logic for requesting notification permissions and filtering already seen articles.
 *
 * @returns {null} - This component does not render anything to the UI.
 */
const NewsPoller = () => {
  // State to hold the latest news articles
  const [latestNews, setLatestNews] = useState([]);

  // Reference to track URLs of articles that have already been seen
  const seenUrlsRef = useRef(new Set());

  // Reference to hold the interval ID for polling
  const intervalRef = useRef(null);

  // Request notification permission on component mount
  useEffect(() => {
    // Request permission for notifications if not already granted
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission !== "granted") {
          console.log("Bildirim izni verilmedi.");
        }
      });
    }
  }, []);

  useEffect(() => {
    // Prevent setting up multiple intervals
    if (intervalRef.current) {
      return;
    }

    // Function to fetch news articles from the API
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/news"); // Fetch news articles
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json(); // Parse the response as JSON

        // If articles exist in the data, filter out already seen ones
        if (data.articles && Array.isArray(data.articles)) {
          const newArticles = data.articles.filter(
            (article) => !seenUrlsRef.current.has(article.url)
          );

          // If there are new articles, display notifications and update state
          if (newArticles.length > 0) {
            newArticles.forEach((article) => {
              if (Notification.permission === "granted") {
                // Create a new notification for the article
                const notification = new Notification(article.title, {
                  body: article.description || "Yeni bir haber var!",
                  icon: article.urlToImage || "/default-icon.png", // Fallback icon
                  data: { url: article.url },
                });

                // Open the article URL when notification is clicked
                notification.onclick = () => {
                  window.open(article.url, "_blank");
                };
              }

              // Mark the article as seen by adding its URL to the set
              seenUrlsRef.current.add(article.url);
            });

            // Update the state with the latest news (keep only the first 100 articles)
            setLatestNews((prevNews) => {
              const updatedNews = [...newArticles, ...prevNews];
              return updatedNews.slice(0, 100);
            });
          }
        }
      } catch (error) {
        console.error("Haber Fetch Hatası:", error); // Handle fetch errors
      }
    };

    // Initial news fetch on component mount
    fetchNews();

    // Set up a polling interval to fetch news every 30 seconds
    intervalRef.current = setInterval(fetchNews, 30 * 1000);

    // Cleanup the interval when the component unmounts
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return null; // This component doesn't render anything to the UI
};

export default NewsPoller;
