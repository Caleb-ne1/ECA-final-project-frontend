import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const AttendanceSummary = ({ attendance }) => {
  // Determine attendance status
  const getStatus = (percentage) => {
    if (percentage >= 80) return { label: "Excellent ✅", color: "bg-green-500" };
    if (percentage >= 50) return { label: "Needs Improvement ⚠️", color: "bg-yellow-500" };
    return { label: "Warning ❌", color: "bg-red-500" };
  };

  const status = getStatus(attendance);

  // Pie Chart Data
  const data = [
    { name: "Attended", value: attendance },
    { name: "Missed", value: 100 - attendance },
  ];
  
  const COLORS = ["#4CAF50", "#FF5252"]; // Green for attended, Red for missed

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-xl font-bold text-blue-800">Attendance Summary</h2>

      {/* Pie Chart */}
      <div className="flex items-center justify-center">
        <ResponsiveContainer width="50%" height={150}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={50}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <p className="font-semibold text-gray-700">Attendance: {attendance}%</p>
        <div className="w-full h-4 mt-2 bg-gray-200 rounded-full">
          <div
            className={`h-4 rounded-full ${status.color}`}
            style={{ width: `${attendance}%` }}
          ></div>
        </div>
        <p className="mt-2 text-sm text-gray-600">{status.label}</p>
      </div>
    </div>
  );
};

export default AttendanceSummary;
