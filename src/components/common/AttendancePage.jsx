import React from "react";

const AttendancePage = () => {

  // mock data
  const attendanceData = [
    {
      date: "Sat 1 Feb 2025",
      time: "2PM - 5PM",
      description: "Regular class session",
      status: "Present",
      points: "2 / 2",
    },
    {
      date: "Sat 8 Feb 2025",
      time: "2PM - 5PM",
      description: "Regular class session",
      status: "Present",
      points: "2 / 2",
    },
    {
      date: "Sat 15 Feb 2025",
      time: "2PM - 5PM",
      description: "Regular class session",
      status: "Absent",
      points: "0 / 2",
    },
    {
      date: "Sat 22 Feb 2025",
      time: "2PM - 5PM",
      description: "Regular class session",
      status: "Present",
      points: "2 / 2",
    },
  ];

  // Summary calculations
  const totalSessions = attendanceData.length;
  const takenSessions = attendanceData.filter((session) => session.status !== "Absent").length;
  const totalPoints = attendanceData.reduce(
    (sum, session) => sum + parseInt(session.points.split(" / ")[0]),
    0
  );
  const maxPoints = attendanceData.reduce(
    (sum, session) => sum + parseInt(session.points.split(" / ")[1]),
    0
  );
  const percentage = ((totalPoints / maxPoints) * 100).toFixed(1);

  return (
    <div className="p-4 mx-auto mt-6">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-collapse border-gray-300">
          <thead>
            <tr className="text-gray-700 bg-gray-200">
              <th className="p-3 text-left border">Date</th>
              <th className="p-3 text-left border">Description</th>
              <th className="p-3 text-left border">Status</th>
              <th className="p-3 text-left border">Points</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((session, index) => (
              <tr key={index} className="text-gray-700 border">
                <td className="p-3 border">{session.date} <br /> {session.time}</td>
                <td className="p-3 border">{session.description}</td>
                <td className={`border p-3 font-semibold ${session.status === "Present" ? "text-green-600" : "text-red-600"}`}>
                  {session.status}
                </td>
                <td className="p-3 border">{session.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Section */}
      <div className="p-3 mt-4 border-l-4 border-green-500">
        <p className="text-gray-800"><strong>Taken sessions:</strong> {takenSessions}</p>
        <p className="text-gray-800"><strong>Points over taken sessions:</strong> {totalPoints} / {maxPoints}</p>
        <p className="text-gray-800"><strong>Percentage over taken sessions:</strong> {percentage}%</p>
      </div>
    </div>
  );
};

export default AttendancePage;
