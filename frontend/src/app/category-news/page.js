"use client";

import { useState } from "react";
import CategoryNewsList from "@/components/CategoryNewsList/CategoryNewsList";
import NewsChart from "@/components/NewsChart/NewsChart";
import { useQuery } from "@tanstack/react-query";
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
    <div className="category-news-container flex-center padding-all">
      <h1 className="category-news-heading text-center">
        Kategoriye Göre En Son Haberler
      </h1>

      <nav className="navbar flex-row gap-16 padding-vertical">
        <ul className="navbar-list flex-row gap-16">
          {categories.map((category) => (
            <li
              key={category}
              className={`navbar-item rounded-sm shadow-sm padding-horizontal ${
                activeCategory === category
                  ? "active text-primary"
                  : "text-muted"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </li>
          ))}
        </ul>
      </nav>

      {isLoading && <p className="loading-text text-center">Yükleniyor...</p>}
      {error && (
        <p className="error-text text-center">
          Bir hata oluştu: {error.message}
        </p>
      )}
      {data && (
        <NewsChart
          articles={data}
          className="category-news-chart rounded shadow-md padding-all max-width"
        />
      )}

      <CategoryNewsList
        category={activeCategory}
        className="category-news-list flex-row-wrap padding-all"
      />
    </div>
  );
}
