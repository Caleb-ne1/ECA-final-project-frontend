import { useState } from "react";

const ParticipantsList = () => {
    const days = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6"];

    const [participants, setParticipants] = useState([
        { id: 1, fullName: "Caleb Kibet", email: "caleb@zetech.ac.ke", status: "pending", attendance: {} },
        { id: 2, fullName: "Kibet Caleb", email: "kibet@zetech.ac.ke", status: "approved", attendance: {} }
    ]);

    const handleStatusChange = (id, newStatus) => {
        setParticipants(prev =>
            prev.map(participant =>
                participant.id === id ? { ...participant, status: newStatus } : participant
            )
        );
    };

    const handleAttendanceChange = (id, day, attendance) => {
        setParticipants(prev =>
            prev.map(participant =>
                participant.id === id
                    ? { ...participant, attendance: { ...participant.attendance, [day]: attendance } }
                    : participant
            )
        );
    };

    return (
        <div className="max-w-full p-6 overflow-auto">
            <table className="w-full bg-white border border-collapse border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left border">Full Name</th>
                        <th className="px-4 py-2 text-left border">Email</th>
                        <th className="px-4 py-2 text-center border">Registration Status</th>
                        {days.map((day, index) => (
                            <th key={index} colSpan="2" className="px-4 py-2 text-center border">{day}</th>
                        ))}
                    </tr>
                    <tr className="bg-gray-50">
                        <th colSpan="3"></th>
                        {days.map((_, index) => (
                            <>
                                <th key={`present-${index}`} className="px-4 py-2 text-center border">Present</th>
                                <th key={`absent-${index}`} className="px-4 py-2 text-center border">Absent</th>
                            </>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {participants.map((participant) => (
                        <tr key={participant.id} className="text-gray-700">
                            <td className="px-4 py-2 border">{participant.fullName}</td>
                            <td className="px-4 py-2 border">{participant.email}</td>
                            <td className="px-4 py-2 text-center border">
                                <select
                                    value={participant.status}
                                    onChange={(e) => handleStatusChange(participant.id, e.target.value)}
                                    className="px-2 py-1 border rounded bg-gray-50"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </td>
                            {days.map((day, index) => (
                                <>
                                    <td key={`present-${participant.id}-${index}`} className="px-4 py-2 text-center border">
                                        <input
                                            type="radio"
                                            name={`attendance-${participant.id}-${day}`}
                                            value="present"
                                            checked={participant.attendance[day] === "present"}
                                            onChange={() => handleAttendanceChange(participant.id, day, "present")}
                                            className="w-5 h-5 text-green-500"
                                        />
                                    </td>
                                    <td key={`absent-${participant.id}-${index}`} className="px-4 py-2 text-center border">
                                        <input
                                            type="radio"
                                            name={`attendance-${participant.id}-${day}`}
                                            value="absent"
                                            checked={participant.attendance[day] === "absent"}
                                            onChange={() => handleAttendanceChange(participant.id, day, "absent")}
                                            className="w-5 h-5 text-red-500"
                                        />
                                    </td>
                                </>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ParticipantsList;


