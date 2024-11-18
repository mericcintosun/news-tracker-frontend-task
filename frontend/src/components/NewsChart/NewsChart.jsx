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
import styles from "./NewsChart.module.css";

// Registering necessary chart components from Chart.js
ChartJS.register(
  CategoryScale,   // For x-axis (categorical scale)
  LinearScale,     // For y-axis (linear scale)
  BarElement,      // For bar chart elements
  Title,           // For chart title
  Tooltip,         // For tooltips on hover
  Legend           // For chart legend
);

/**
 * NewsChart Component
 * Displays a bar chart of news article counts grouped by hour of publication.
 * It uses the Chart.js library to render a responsive bar chart.
 *
 * @param {Object} props - The component's props.
 * @param {Array} props.articles - The articles data to be visualized in the chart.
 * @returns {JSX.Element} - The rendered NewsChart component.
 */
const NewsChart = ({ articles }) => {
  // Filtering the articles based on predefined criteria
  const filteredArticles = filterArticles(articles);
  
  // Grouping articles by the hour of publication
  const hoursCount = groupArticlesByHour(filteredArticles);

  // Chart data configuration
  const data = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00 - ${i + 1}:00`),  // Labels for the hours
    datasets: [
      {
        label: "Haber Sayısı", // Label for the dataset
        data: hoursCount,      // Data representing article counts by hour
        backgroundColor: "rgba(75, 192, 192, 0.8)", // Bar color
        borderColor: "rgba(75, 192, 192, 1)", // Border color for bars
        borderWidth: 2, // Border width for the bars
        hoverBackgroundColor: "rgba(54, 162, 235, 0.9)", // Hover color for bars
        hoverBorderColor: "rgba(54, 162, 235, 1)", // Hover border color
      },
    ],
  };

  // Chart options configuration
  const options = {
    responsive: true, // Make the chart responsive
    maintainAspectRatio: false, // Prevent maintaining aspect ratio
    plugins: {
      legend: {
        display: true, // Display the legend
        position: "top", // Legend position
        labels: {
          font: {
            size: 14, // Font size for legend labels
            family: "'Helvetica Neue', 'Arial', sans-serif", // Font family for legend labels
          },
          color: "white", // Legend label color
        },
      },
      title: {
        display: true, // Display the title
        text: "Haber Yayınlanma Saatleri", // Title text
        font: {
          size: 18, // Font size for the title
          family: "'Helvetica Neue', 'Arial', sans-serif", // Font family for the title
          weight: "bold", // Title font weight
        },
        color: "white", // Title color
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide the x-axis grid
        },
        ticks: {
          font: {
            size: 10, // Font size for x-axis labels
          },
          color: "white", // x-axis label color
        },
      },
      y: {
        grid: {
          borderDash: [5, 5], // Dashed grid lines for the y-axis
        },
        ticks: {
          font: {
            size: 10, // Font size for y-axis labels
          },
          color: "white", // y-axis label color
        },
      },
    },
    interaction: {
      mode: "index", // Interaction mode for tooltips
      intersect: false, // Tooltip appears even if not intersecting
    },
  };

  // Return the chart wrapped in a container
  return (
    <div className={styles.newsChartContainer}>
      <Bar data={data} options={options} className={styles.newsChart} />
    </div>
  );
};

export default NewsChart;
