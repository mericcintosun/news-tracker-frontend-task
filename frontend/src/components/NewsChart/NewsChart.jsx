"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { groupArticlesByHour } from "@/utils/formatDate";
import { filterArticles } from "@/lib/filterArticles";
import styles from "./NewsChart.module.css"; // CSS Modülünü import et

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const NewsChart = ({ articles }) => {
  const filteredArticles = filterArticles(articles);
  const hoursCount = groupArticlesByHour(filteredArticles);

  const data = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00 - ${i + 1}:00`),
    datasets: [
      {
        label: "Haber Sayısı",
        data: hoursCount,
        backgroundColor: "rgba(54, 162, 235, 0.8)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        hoverBackgroundColor: "rgba(75, 192, 192, 0.9)",
        hoverBorderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            size: 14,
            family: "'Helvetica Neue', 'Arial', sans-serif",
          },
          color: "#333",
        },
      },
      title: {
        display: true,
        text: "Haber Yayınlanma Saatleri",
        font: {
          size: 18,
          family: "'Helvetica Neue', 'Arial', sans-serif",
          weight: "bold",
        },
        color: "#333",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          color: "#666",
        },
      },
      y: {
        grid: {
          borderDash: [5, 5],
        },
        ticks: {
          font: {
            size: 12,
          },
          color: "#666",
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
  };

  return (
    <div className={styles.newsChartContainer}>
      {" "}
      {/* CSS modülünü burada kullan */}
      <Bar data={data} options={options} className={styles.newsChart} />{" "}
      {/* CSS modülünü burada kullan */}
    </div>
  );
};

export default NewsChart;
