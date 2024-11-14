"use client";

import CategoryNewsList from "@/components/CategoryNewsList";

const categories = ["technology", "general", "business", "sports"];

export default function CategoryNewsPage() {
  return (
    <div>
      <h1>Kategoriye Göre En Son Haberler</h1>
      {categories.map((category) => (
        <CategoryNewsList key={category} category={category} />
      ))}
    </div>
  );
}
