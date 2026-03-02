import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios"; 
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ActivitiesChart = () => {
  const [monthlyData, setMonthlyData] = useState(new Array(12).fill(0)); 

  useEffect(() => {
    // fetch data from the backend
    axios.get(`${import.meta.env.VITE_APP_API_URL}/api/count_per_month/activities`) 
      .then((response) => {
        const activities = response.data;

        // Create an array with all months
        const formattedData = new Array(12).fill(0);
        activities.forEach(activity => {
          formattedData[activity.month - 1] = activity.count;
        });

        setMonthlyData(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching activities:", error);
      });
  }, []);

  console.log(monthlyData)

  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const data = {
    labels,
    datasets: [
      {
        label: "Activities Created",
        data: monthlyData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        pointRadius: 5,
        tension: 0.3, 
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Activities",
        },
      },
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
    },
  };

  return (
    <div className="p-4 bg-white">
      <h2 className="mb-3 text-lg font-bold">Activities Created Per Month</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default ActivitiesChart;
