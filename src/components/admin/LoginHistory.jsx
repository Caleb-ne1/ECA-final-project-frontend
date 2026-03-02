import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

const LoginHistory = () => {
  const [loginHistory, setLoginHistory] = useState([]);
  const [error, setError] = useState(null);

  // Get id from URL
  const queryParams = new URLSearchParams(window.location.search);
  const userId = queryParams.get("id");

  // fetch user login history
  useEffect(() => {
    const fetchLoginHistory = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/user/get-user-login-history/${userId}`);
        setLoginHistory(response.data.data);
      } catch (err) {
        setError("Failed to fetch login history.");
      }
    };

    fetchLoginHistory();
  }, [userId]);

  // navigate back
  const goBack = () => {
    const navigate = useNavigate();
    return () => navigate(-1);
  };

  return (
    <div className="px-6 py-4 mt-16 mb-10">
      <button onClick={goBack()} className="flex items-center gap-2 mb-6 text-blue-900 bg-transparent border-none hover:cursor-pointer"> <IoMdArrowBack /> Go Back</button>
      <h2 className="mb-4 text-xl font-semibold">Login Activity</h2>

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : loginHistory.length === 0 ? (
        <p className="text-gray-600">No login history found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 bg-gray-50">
            <thead className="text-gray-700 bg-gray-200">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">IP Address</th>
                <th className="px-4 py-2 border">Device</th>
                <th className="px-4 py-2 border">User Agent</th>
                <th className="px-4 py-2 border">Login Time</th>
              </tr>
            </thead>
            <tbody>
              {loginHistory.map((log, index) => (
                <tr key={log.id} className="text-center bg-white hover:bg-gray-100">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{log.ipAddress || "N/A"}</td>
                  <td className="px-4 py-2 border">{log.device || "N/A"}</td>
                  <td className="max-w-xs px-4 py-2 truncate border">{log.userAgent || "N/A"}</td>
                  <td className="px-4 py-2 border">{new Date(log.loginTime).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LoginHistory;
