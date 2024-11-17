"use client";

import { useState } from "react";
import CategoryNewsList from "@/components/CategoryNewsList/CategoryNewsList";
import NewsChart from "@/components/NewsChart/NewsChart";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import "./CategoryNewsPage.css";

const categories = ["technology", "general", "business", "sports"];

const fetchCategoryNews = async (category) => {
  const res = await fetch(`/api/news?category=${category}`);
  if (!res.ok) {
    throw new Error("Veri alınamadı");
  }
  const data = await res.json();
  return data.articles;
};

export default function CategoryNewsPage() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["news", activeCategory],
    queryFn: () => fetchCategoryNews(activeCategory),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return (
    <div
      className="category-news-container"
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1
        className="category-news-heading"
        style={{
          textAlign: "center",
          fontSize: "2rem",
          marginBottom: "20px",
        }}
      >
        Kategoriye Göre En Son Haberler
      </h1>

      <nav
        className="navbar"
        style={{
          width: "100%",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <ul
          className="navbar-list"
          style={{
            display: "flex",
            flexWrap: "wrap",
            listStyle: "none",
            padding: "0",
            gap: "10px",
          }}
        >
          {categories.map((category) => (
            <li
              key={category}
              className={`navbar-item`}
              style={{
                padding: "10px 15px",
                borderRadius: "5px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
                backgroundColor:
                  activeCategory === category ? "#0070f3" : "transparent",
                color: activeCategory === category ? "#fff" : "#555",
                fontWeight: activeCategory === category ? "bold" : "normal",
              }}
              onClick={() => setActiveCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </li>
          ))}
        </ul>
      </nav>

      {isLoading && <LoadingSpinner />}
      {error && (
        <p
          className="error-text"
          style={{
            textAlign: "center",
            color: "red",
            fontSize: "1rem",
            margin: "10px 0",
          }}
        >
          Bir hata oluştu: {error.message}
        </p>
      )}
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

      <CategoryNewsList
        category={activeCategory}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
          padding: "20px",
          width: "100%",
          maxWidth: "1200px",
        }}
      />
    </div>
  );
}
