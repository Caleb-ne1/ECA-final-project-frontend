import React, { useState, useEffect } from "react";
import axios from "axios";

const AttendancePage = ({ activity_id }) => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch attendance data
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/api/activity/get-user-attendance/${activity_id}`, {
            withCredentials: true
          }
        );
        setAttendanceData(response.data.attendance);
      } catch (error) {
        console.error("Error fetching attendance:", error);
        setError("Failed to fetch attendance data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [activity_id]);

  return (
    <div className="p-4 mx-auto mt-6">
      <h2 className="mb-4 text-lg font-bold">Attendance Records</h2>

      {/* Loading and Error Messages */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Table */}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="w-full border border-collapse border-gray-300">
            <thead>
              <tr className="text-gray-700 bg-gray-200">
                <th className="p-3 text-left border">Description</th>
                <th className="p-3 text-left border">Status</th>
                <th className="p-3 text-left border">Points</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.length > 0 ? (
                attendanceData.map((session, index) => (
                  <tr key={index} className="text-gray-700 border">
                    <td className="p-3 border">{session.description}</td>
                    <td
                      className={`border p-3 font-semibold ${
                        session.status === "present"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {session.status}
                    </td>
                    <td className="p-3 border">{session.points}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-3 text-center border">
                    No attendance records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AttendancePage;

