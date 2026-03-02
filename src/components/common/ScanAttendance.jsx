import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";
import { ToastContainer, Bounce, toast } from "react-toastify";

const ScanAttendance = ({ startDate, endDate, activity_id }) => {
  const [selectedDay, setSelectedDay] = useState("");
  const [scanResult, setScanResult] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  // Generate list of days from startDate to endDate
  const generateDays = (startDate, endDate) => {
    if (!startDate || !endDate) return [];

    const days = [];
    let currentDate = new Date(startDate);
    let end = new Date(endDate);
    let dayCount = 1;

    while (currentDate <= end) {
      days.push({ label: `Day ${dayCount}`, value: `Day ${dayCount}` });
      currentDate.setDate(currentDate.getDate() + 1);
      dayCount++;
    }

    return days;
  };

  const days = generateDays(startDate, endDate);

  const handleStartScanning = () => {
    if (!selectedDay) {
      toast.error("Please select a day to start scanning.!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      return;
    }
    setScanResult("");
    setIsScanning(true);
    console.log(`Starting scan for: ${selectedDay} in activity ${activity_id}`);
  };

  const handleReselectDay = () => {
    setSelectedDay("");
    setScanResult("");
    setIsScanning(false);
  };

  useEffect(() => {
    let scanner;

    if (isScanning) {
      scanner = new Html5QrcodeScanner("reader", {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1,
        disableFlip: false,
      });

      scanner.render(
        async (decodedText) => {
          setScanResult(decodedText);
          setIsScanning(false);
          scanner.clear();

          try {
            await axios.post(
              `${
                import.meta.env.VITE_APP_API_URL
              }/api/activity/mark-attendance-qrcode`,
              {
                qrcode: decodedText,
                activity_id: activity_id,
                status: "present",
                date_time: selectedDay,
                description: selectedDay,
              }
            );

            toast.success(`Attendance marked for ${selectedDay}, status: present`, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
              });
          } catch (error) {
            toast.error(
              `${error.response?.data?.error}`,
              {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
              }
            );
          }
        },
        (errorMessage) => {
          console.warn("QR Code scan error:", errorMessage);
        }
      );
    }

    return () => {
      if (scanner) scanner.clear();
    };
  }, [isScanning, activity_id, selectedDay]);

  return (
    <div className="max-w-lg p-6 mx-auto mt-10">
      <h2 className="mb-4 text-2xl font-semibold text-center">
        Scan Attendance
      </h2>

      {/* day selection dropdown */}
      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">
          Select Day:
        </label>
        <select
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
        >
          <option value="">-- Select Day --</option>
          {days.length > 0 ? (
            days.map((day, index) => (
              <option key={index} value={day.value}>
                {day.label}
              </option>
            ))
          ) : (
            <option value="">No available days</option>
          )}
        </select>
      </div>

      {/* start scanning button */}
      {!isScanning && selectedDay && (
        <button
          onClick={handleStartScanning}
          className="w-full py-2 text-white transition rounded-md hover:bg-blue-900 bg-blue-950"
        >
          Start Scanning
        </button>
      )}

      {/* reselect day button */}
      {selectedDay && (
        <button
          onClick={handleReselectDay}
          className="w-full py-2 mt-2 text-white bg-red-600 rounded-md hover:bg-red-800"
        >
          Reselect Day
        </button>
      )}

      {/* QR Code scanner */}
      {isScanning && <div id="reader" className="mt-4"></div>}

      {/* scan result message */}
      {scanResult && (
        <p className="mt-4 text-center text-green-600">
          Scan successful for {selectedDay}: {scanResult}
        </p>
      )}

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </div>
  );
};

export default ScanAttendance;
