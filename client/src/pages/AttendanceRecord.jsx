import { useEffect, useState } from "react";
import API from "../services/api";

function AttendanceRecord() {
  const [month, setMonth] = useState("");
  const [records, setRecords] = useState([]);

  const fetchAttendance = async () => {
    try {
            const url = month
            ? `/attendance/all?month=${month}`
            : `/attendance/all`;

            const res = await API.get(url);
            setRecords(res.data);
        } catch (err) {
            alert("Failed to load attendance");
        }
    };


  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <div className="attendance-page">
      <h2 className="page-title">Attendance Records</h2>

      <div className="attendance-filter">
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
        <button onClick={fetchAttendance}>View</button>
      </div>

      {records.length === 0 && (
        <p className="empty-text">No attendance records found</p>
      )}

      <div className="attendance-table">
        <div className="table-header">
            <span>Employee</span>
            <span>Date</span>
            <span>Check In</span>
            <span>Check Out</span>
            <span>Hours</span>
        </div>


        {records.map((r, i) => (
            <div key={i} className="table-row">
                <span>{r.employee || "—"}</span>
                <span>{r.date}</span>
                <span>{r.checkIn || "-"}</span>
                <span>{r.checkOut || "-"}</span>
                <span>{r.totalHours || "0"} hrs</span>
            </div>
        ))}

      </div>
    </div>
  );
}

export default AttendanceRecord;
