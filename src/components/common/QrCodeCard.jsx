import { QRCodeSVG } from "qrcode.react";

const QrCodeCard = ({ name, institutionId, activityName, qrValue }) => {
  return (
    <div className="max-w-xs p-6 mx-auto text-center">
      {/* QR Code */}
      <div className="flex justify-center mb-4">
        <div className="p-2 bg-white rounded-lg shadow-md">
          <QRCodeSVG value={qrValue} size={130} />
        </div>
      </div>

      {/* Details Section */}
      <h2 className="text-xl font-bold text-gray-800">{name}</h2>
      <p className="inline-block px-3 py-1 text-sm text-gray-600 bg-gray-200 rounded-full">
        ID: {institutionId}
      </p>
      <p className="mt-3 text-lg font-semibold text-blue-700">
        {activityName}
      </p>
    </div>
  );
};

export default QrCodeCard;

