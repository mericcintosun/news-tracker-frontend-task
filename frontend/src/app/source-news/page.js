"use client";

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
  return (
    <div>
      <h1>Kaynağa Göre En Son Haberler</h1>
      {sources.map((source) => (
        <SourceNewsList key={source} source={source} />
      ))}
    </div>
  );
}
