import { useState } from "react";
import API from "../services/api";

function AdminPayroll() {
  const [month, setMonth] = useState("");
  const [data, setData] = useState([]);

  const fetchPayroll = async () => {
    const res = await API.get(`/payroll/all?month=${month}`);
    setData(res.data);
  };

  return (
    <div className="payroll-page">
      <h2 className="page-title">Payroll Report</h2>

      <div className="payroll-filter">
        <input
          type="month"
          onChange={(e) => setMonth(e.target.value)}
        />
        <button onClick={fetchPayroll}>View</button>
      </div>

      {data.length === 0 && (
        <p className="empty-text">No payroll data</p>
      )}

      <div className="payroll-list">
        {data.map((p, i) => (
          <div key={i} className="payroll-card">
            <div>
              <h4>{p.employee}</h4>
              <p>{p.totalHours} hours</p>
            </div>
            <div className="salary">
              ₹{p.salary}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPayroll;
