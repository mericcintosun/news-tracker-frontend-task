"use client";

import { useState } from "react";
import CategoryNewsList from "@/components/CategoryNewsList";

const categories = ["technology", "general", "business", "sports"];

export default function CategoryNewsPage() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <div>
      <h1>Kategoriye Göre En Son Haberler</h1>
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
      <CategoryNewsList category={activeCategory} />
    </div>
  );
}
