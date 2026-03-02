import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const StudentParticipationChart = () => {
  const [participationData, setParticipationData] = useState([]);

  useEffect(() => {
    const fetchParticipationData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/activity/attendance-rate`); 
        const result = await response.json();

        if (result.success && result.data) {
          // Ensure unique activities and format data correctly
          const uniqueActivities = result.data.reduce((acc, curr) => {
            const existing = acc.find(item => item.activity === curr.activity_name);
            if (!existing) {
              acc.push({
                activity: curr.activity_name,
                percentage: parseFloat(curr.attendance_rate.replace("%", "")), // Convert to number
              });
            }
            return acc;
          }, []);

          setParticipationData(uniqueActivities);
        }
      } catch (error) {
        console.error("Error fetching participation data:", error);
      }
    };

    fetchParticipationData();
  }, []);

  const data = {
    labels: participationData.map((item) => item.activity),
    datasets: [
      {
        label: "Student Participation (%)",
        data: participationData.map((item) => item.percentage),
        backgroundColor: [
          "#ff6384", // Red
          "#36a2eb", // Blue
          "#ffce56", // Yellow
          "#4bc0c0", // Teal
          "#9966ff", // Purple
          "#ff9f40", // Orange
          "#c9cbcf", // Grey
          "#ff4500", // Orange-Red
          "#8a2be2", // Blue-Violet
          "#32cd32", // Lime-Green
          "#ff1493", // Deep Pink
          "#00ced1", // Dark Turquoise
          "#ffd700", // Gold
          "#1e90ff", // Dodger Blue
          "#dc143c", // Crimson
          "#7b68ee", // Medium Slate Blue
          "#228b22", // Forest Green
          "#ff69b4", // Hot Pink
          "#6a5acd", // Slate Blue
          "#20b2aa", // Light Sea Green
        ],
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { enabled: true },
    },
  };

  return (
    <div className="bg-white p-4 shadow-md">
      <h2 className="text-lg font-bold mb-3">Student Participation</h2>
      {participationData.length > 0 ? (
        <Pie data={data} options={options} />
      ) : (
        <p className="text-center text-gray-500">No participation data available</p>
      )}
    </div>
  );
};

export default StudentParticipationChart;

