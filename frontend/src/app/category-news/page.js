"use client";

// Import necessary dependencies and components
import { useState } from "react";
import CategoryNewsList from "@/components/CategoryNewsList/CategoryNewsList";
import NewsChart from "@/components/NewsChart/NewsChart";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import "./CategoryNewsPage.css";

// Define the categories for news filtering
const categories = ["technology", "general", "business", "sports"];

// Fetch news articles for the selected category
const fetchCategoryNews = async (category) => {
  const res = await fetch(`/api/news?category=${category}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data.articles;
};

export default function CategoryNewsPage() {
  // Track the active category state
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  // Fetch the news data using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["news", activeCategory],
    queryFn: () => fetchCategoryNews(activeCategory),
    staleTime: 1000 * 60 * 5, // Cache the data for 5 minutes
    refetchOnWindowFocus: false, // Disable automatic refetching on window focus
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
      {/* Page title */}
      <h1
        className="category-news-heading"
        style={{
          textAlign: "center",
          fontSize: "2rem",
          marginBottom: "20px",
        }}
      >
        Latest News by Category
      </h1>

      {/* Navigation bar for selecting news categories */}
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
              onClick={() => setActiveCategory(category)} // Set the active category on click
            >
              {/* Capitalize category name for better readability */}
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </li>
          ))}
        </ul>
      </nav>

      {/* Display loading spinner while data is being fetched */}
      {isLoading && <LoadingSpinner />}

      {/* Display error message if fetching fails */}
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
          An error occurred: {error.message}
        </p>
      )}

      {/* Display news chart if data is successfully fetched */}
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

      {/* Display a list of news articles for the selected category */}
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
