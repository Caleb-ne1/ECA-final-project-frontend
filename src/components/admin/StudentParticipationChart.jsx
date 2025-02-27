import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const StudentParticipationChart = ({ participationData }) => {
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
      <Pie data={data} options={options} />
    </div>
  );
};

export default StudentParticipationChart;
