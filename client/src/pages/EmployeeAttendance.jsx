import { useEffect, useState } from "react";
import API from "../services/api";

function EmployeeAttendance() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const res = await API.get("/attendance/me");
      setRecords(res.data);
    } catch (err) {
      alert("Failed to load attendance");
    } finally {
      setLoading(false);
    }
  };

  const checkIn = async () => {
    try {
      await API.post("/attendance/check-in");
      alert("Checked in successfully");
      fetchAttendance();
    } catch (err) {
      alert(err.response?.data?.message || "Check-in failed");
    }
  };

  const checkOut = async () => {
    try {
      await API.put("/attendance/check-out");
      alert("Checked out successfully");
      fetchAttendance();
    } catch (err) {
      alert(err.response?.data?.message || "Check-out failed");
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <div className="attendance-page">
      <h2>My Attendance</h2>

      <div style={{ marginBottom: "15px" }}>
        <button className="success" onClick={checkIn}>Check In</button>
        <button className="danger" onClick={checkOut} style={{ marginLeft: "10px" }}>
          Check Out
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {!loading && records.length === 0 && <p>No records yet</p>}

      <ul>
        {records.map((r, index) => (
          <li key={index}>
            📅 {r.date} | ⏱ {r.totalHours} hrs
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeAttendance;
