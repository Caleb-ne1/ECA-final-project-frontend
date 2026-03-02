import React, { useState, useEffect } from "react";
import axios from "axios";

const ParticipantsList = ({ startDate, endDate, activity_id, activity_name }) => {
    const [participants, setParticipants] = useState([]);
    const [attendance, setAttendance] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("present"); 

    // generate list of days using activity start date and end date
    const generateDays = (startDate, endDate) => {
        const days = [];
        let currentDate = new Date(startDate);
        let end = new Date(endDate);
        let dayCount = 1;

        while (currentDate <= end) {
            days.push(`Day ${dayCount}`);
            currentDate.setDate(currentDate.getDate() + 1);
            dayCount++;
        }

        return days;
    };

    const days = generateDays(startDate, endDate);

    // Fetch participants
    const fetchParticipants = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_APP_API_URL}/api/activity/participants/${activity_id}`
            );
            setParticipants(response.data.data);
        } catch (error) {
            console.error("Error fetching participants:", error);
        }
    };

    // Fetch attendance data
    const fetchAttendance = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_APP_API_URL}/api/activity/get-attendance/${activity_id}`
            );
            const attendanceData = response.data.attendance;

            const attendanceMap = {};
            attendanceData.forEach(({ user_id, description, status }) => {
                if (!attendanceMap[user_id]) {
                    attendanceMap[user_id] = {};
                }

                // extract "Day X" from description
                const dayMatch = description.match(/Day \d+/);
                if (dayMatch) {
                    const day = dayMatch[0];
                    attendanceMap[user_id][day] = status;
                }
            });

            setAttendance(attendanceMap);
        } catch (error) {
            console.error("Error fetching attendance:", error);
        }
    };

    useEffect(() => {
        fetchParticipants();
        fetchAttendance();
    }, []);

    // handle attendance change
    const handleAttendanceChange = async (user_id, day, status) => {
        setAttendance(prev => ({
            ...prev,
            [user_id]: { ...prev[user_id], [day]: status }
        }));

        try {
            await axios.post(
                `${import.meta.env.VITE_APP_API_URL}/api/activity/mark-attendance`,
                {
                    user_id,
                    activity_id,
                    status,
                    date_time: day,
                    points: status === "present" ? "2" : "0",
                    description: day,
                }
            );
        } catch (error) {
            console.error("Error marking attendance:", error);
        }
    };

    // filter participants based on search term
    const filteredParticipants = participants.filter((participant) =>
        participant.User?.FirstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        participant.User?.LastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        participant.User?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // function to download CSV based on selected attendance status
    const downloadCSV = () => {
        let csvContent = "data:text/csv;charset=utf-8,";
    
        // create the header row with dynamic days
        csvContent += "Full Name, Email, Phone," + days.join(",") + "\n";
    
        // loop through each participant and generate row
        filteredParticipants.forEach((participant) => {
            let row = `${participant.User?.FirstName || "N/A"} ${participant.User?.LastName || ""},${participant.User?.email || "N/A"},${participant.User?.phone || "N/A"}`;
    
            // loop through days and add attendance status for each day
            days.forEach((day) => {
                let status = attendance[participant.user_id]?.[day] || "N/A";
                row += `,${status}`;
            });
    
            csvContent += row + "\n";
        });
    
        // encode and create download link
        const encodedUri = encodeURI(csvContent);
        const filename = filterStatus === "downloadall"
        ? `${activity_name}_attendance_all.csv`
        : `${activity_name}_attendance_${filterStatus}.csv`;
    
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    
    

    return (
        <div className="max-w-full p-6 overflow-auto">
            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            {/* Table */}
            <table className="w-full bg-white border border-collapse border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left border">#</th>
                        <th className="px-4 py-2 text-left border">Full Name</th>
                        <th className="px-4 py-2 text-left border">Phone</th>
                        <th className="px-4 py-2 text-left border">Email</th>
                        {days.map((day, index) => (
                            <th key={index} className="px-4 py-2 text-center border">{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {filteredParticipants.map((participant, index) => (
                        <tr key={participant.user_id} className="text-gray-700">
                            <td className="px-4 py-2 border" >{index + 1}</td>
                            <td className="px-4 py-2 border">
                                {participant.User?.FirstName || "N/A"} {participant.User?.LastName}
                            </td>
                            <td className="px-4 py-2 border">
                                {participant.User?.phone || "N/A"}
                            </td>
                            <td className="px-4 py-2 border">
                                {participant.User?.email || "N/A"}
                            </td>
                            {days.map((day, index) => (
                                <td key={`attendance-${participant.user_id}-${index}`} className="px-4 py-2 text-center border">
                                    <select
                                        value={attendance[participant.user_id]?.[day] || ""}
                                        onChange={(e) => handleAttendanceChange(participant.user_id, day, e.target.value)}
                                        className="p-2 border rounded"
                                    >
                                        <option value="">-- Select --</option>
                                        <option value="present">Present</option>
                                        <option value="absent">Absent</option>
                                    </select>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Dropdown and Download Button */}
            <div className="flex items-center mt-4 space-x-4">
                <label className="text-gray-700">Download attendance for:</label>
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="downloadall">All</option>
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                </select>
                <button
                    onClick={downloadCSV}
                    className="px-4 py-2 text-white rounded-md bg-blue-950 hover:bg-blue-900"
                >
                    Download CSV
                </button>
            </div>
        </div>
    );
};

export default ParticipantsList;








