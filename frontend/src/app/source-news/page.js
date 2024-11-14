"use client";

import { useState } from "react";
import SourceNewsList from "@/components/SourceNewsList";

const sources = [
  "bbc-news",
  "cnn",
  "the-new-york-times",
  "the-guardian-uk",
  "reuters",
  "al-jazeera-english",
  "fox-news",
  "bloomberg",
  "associated-press",
  "the-washington-post",
];

export default function SourceNewsPage() {
  const [activeSource, setActiveSource] = useState(sources[0]);

  return (
    <div>
      <h1>Kaynağa Göre En Son Haberler</h1>
      <nav className="navbar">
        <ul className="navbar-list">
          {sources.map((source) => (
            <li
              key={source}
              className={`navbar-item ${
                activeSource === source ? "active" : ""
              }`}
              onClick={() => setActiveSource(source)}
            >
              {source
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </li>
          ))}
        </ul>
      </nav>
      <SourceNewsList source={activeSource} />
    </div>
  );
}
