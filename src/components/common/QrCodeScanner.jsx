import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { ToastContainer, toast } from 'react-toastify';

const QrCodeScanner = () => {
  const [scanResult, setScanResult] = useState("");
  const scannerRef = useRef(null);

  useEffect(() => {
    const handleScanSuccess = (decodedText) => {
      setScanResult(decodedText);
      alert(`Scanned data: ${decodedText}`);
      
    };

    const handleScanError = (error) => {
      console.error("QR Code scan error:", error);
    };

    const scanner = new Html5QrcodeScanner(
      "qr-code-scanner",
      {
        fps: 10,
        qrbox: {
          width: 250,
          height: 250,
        },
      },
      true
    );

    scanner.render(handleScanSuccess, handleScanError);

    scannerRef.current = scanner;

    
    return () => {
      scannerRef.current.clear().catch((error) => {
        console.error("Failed to clear html5QrcodeScanner.", error);
      });
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">QR Code Scanner</h1>

      {/* scanner container */}
      <div
        id="qr-code-scanner"
        className="w-full overflow-hidden rounded-lg"
      ></div>

      {/* scan results */}
      {scanResult && (
        <div className="p-3 mt-4 bg-green-100 rounded-lg">
          <p className="text-green-800">Scanned Result: {scanResult}</p>
        </div>
      )}
    </div>
  );
};

export default QrCodeScanner;
