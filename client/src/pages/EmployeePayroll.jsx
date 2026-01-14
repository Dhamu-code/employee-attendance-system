import { useState } from "react";
import API from "../services/api";

function EmployeePayroll() {
  const [month, setMonth] = useState("");
  const [data, setData] = useState(null);

  const fetchPayroll = async () => {
    const res = await API.get(`/payroll/me?month=${month}`);
    setData(res.data);
  };

  return (
    <div className="card">
      <h2>My Payroll</h2>

      <input
        type="month"
        onChange={(e) => setMonth(e.target.value)}
      />
      <button className="primary" onClick={fetchPayroll}>View</button>

      {data && (
        <div>
          <p>Total Hours: {data.totalHours}</p>
          <p>Hourly Rate: ₹{data.hourlyRate}</p>
          <p>Salary: ₹{data.salary}</p>
        </div>
      )}
    </div>
  );
}

export default EmployeePayroll;
