import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Filler
);

const Graph = ({ graphData = [] }) => {

  const labels = graphData.map((item) => `${item.clickDate}`);
  const userPerDays = graphData.map((item) => item.count);

  const data = {
    labels:
      graphData.length > 0
        ? labels
        : ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],

    datasets: [
      {
        label: "Total Clicks",
        data:
          graphData.length > 0
            ? userPerDays
            : [1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1],

        backgroundColor: "#3b82f6",
        borderColor: "#1D2327",
        pointBorderColor: "#1D2327",
        fill: true,
        tension: 0.4,
        barThickness: 20,
        categoryPercentage: 1.5,
        barPercentage: 1.5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) =>
            Number.isInteger(value) ? value.toString() : null,
        },
        grid: {
          color: "rgba(148,163,184,0.2)",
        },
        title: {
          display: true,
          text: "Number of Clicks",
          font: {
            size: 16,
            weight: "bold",
            family: "Arial",
          },
          color: "#000000",
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
          font: {
            size: 16,
            weight: "bold",
            family: "Arial",
          },
          color: "#000000",
        },
      },
    },
  };

  return (
    <Bar
      className="w-full"
      data={data}
      options={options}
    />
  );
};

export default Graph;
