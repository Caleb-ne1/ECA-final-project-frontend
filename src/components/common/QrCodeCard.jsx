import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { FaSync, FaDownload } from "react-icons/fa";
import QRCode from "react-qr-code";
import { ToastContainer, Bounce, toast } from "react-toastify";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";

const QrCodeCard = ({ name, activityName, activity_Id, user_Id }) => {
  const [qrValue, setQrValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const qrRef = useRef(null); // Reference to the QR code section

  const fetchQrcode = async (activity_Id) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_APP_API_URL
        }/api/activity/attendance/qrcode/${activity_Id}`,
        { withCredentials: true }
      );
      setQrValue(response.data.qrcode);
    } catch (error) {
      console.error("Failed to fetch QR code:", error);
    } finally {
      setLoading(false);
    }
  };

  const regenerateQrcode = async () => {
    setUpdating(true);
    try {
      const response = await axios.patch(
        `${
          import.meta.env.VITE_APP_API_URL
        }/api/activity/regenerate-qrcode/${activity_Id}`,
        {},
        { withCredentials: true }
      );

      toast.success("QR Code regenerated successfully!");
      setQrValue(response.data.qrcode);
    } catch (error) {
      console.error("Failed to regenerate QR code:", error);
      toast.error("Failed to regenerate QR code.");
    } finally {
      setUpdating(false);
    }
  };

  const downloadQrCode = () => {
    if (!qrRef.current) {
      toast.error("QR code not available for download.");
      return;
    }

    toPng(qrRef.current)
      .then((dataUrl) => {
        saveAs(dataUrl, `qrcode-${activity_Id}.png`);
        toast.success("QR Code downloaded successfully!");
      })
      .catch((error) => {
        console.error("Failed to download QR code:", error);
        toast.error("Failed to download QR code.");
      });
  };

  useEffect(() => {
    if (activity_Id) {
      fetchQrcode(activity_Id);
    }
  }, [activity_Id]);

  return (
    <div className="max-w-xs p-6 mx-auto text-center">
      {/* QR Code Section to Capture */}
      <div ref={qrRef} className="p-4 bg-white">
        {loading ? (
          <p className="text-gray-500">Loading QR code...</p>
        ) : qrValue ? (
          <div className="flex flex-col items-center">
            <QRCode value={qrValue} size={200} />
            <p className="mt-3 text-lg font-semibold text-blue-700">
              {activityName}
            </p>
          </div>
        ) : (
          <p className="text-red-600">No QR code available</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={regenerateQrcode}
          className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          disabled={updating}
        >
          <FaSync className={updating ? "animate-spin" : ""} />
          {updating ? "Regenerating..." : "Regenerate"}
        </button>

        <button
          onClick={downloadQrCode}
          className="flex items-center gap-2 px-4 py-2 text-white bg-red-700 rounded-lg hover:bg-red-600"
        >
          <FaDownload />
          Download
        </button>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
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

export default QrCodeCard;

