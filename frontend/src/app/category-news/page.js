"use client";

import { useState } from "react";
import CategoryNewsList from "@/components/CategoryNewsList";
import NewsChart from "@/components/NewsChart/NewsChart";
import { useQuery } from "@tanstack/react-query";

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

  // useQuery için v5 uyumlu yapı
  const { data, isLoading, error } = useQuery({
    queryKey: ["news", activeCategory],
    queryFn: () => fetchCategoryNews(activeCategory),
    staleTime: 1000 * 60 * 5, // 5 dakika boyunca önbellekte saklar
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      <h1>Kategoriye Göre En Son Haberler</h1>

      {/* Navbar */}
      <nav className="navbar">
        <ul className="navbar-list">
          {categories.map((category) => (
            <li
              key={category}
              className={`navbar-item ${
                activeCategory === category ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </li>
          ))}
        </ul>
      </nav>

      {/* Haber Grafiği */}
      {isLoading && <p>Yükleniyor...</p>}
      {error && <p>Bir hata oluştu: {error.message}</p>}
      {data && <NewsChart articles={data} />}

      {/* Haber Listesi */}
      <CategoryNewsList category={activeCategory} />
    </div>
  );
}
