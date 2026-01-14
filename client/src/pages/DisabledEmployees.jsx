import { useEffect, useState } from "react";
import API from "../services/api";

function DisabledEmployees() {
  const [employees, setEmployees] = useState([]);

  const loadDisabled = async () => {
    const res = await API.get("/admin/employees/disabled");
    setEmployees(res.data);
  };

  const enableEmployee = async (id) => {
    await API.put(`/admin/employee/${id}/enable`);
    alert("Employee enabled");
    loadDisabled();
  };

  useEffect(() => {
    loadDisabled();
  }, []);

  return (
    <div className="disabled-page">
      <h2 className="page-title">Disabled Employees</h2>

      {employees.length === 0 && (
        <p className="empty-text">No disabled employees</p>
      )}

      <div className="disabled-list">
        {employees.map((emp) => (
          <div key={emp._id} className="disabled-card">
            <div className="disabled-info">
              <h4>{emp.name}</h4>
              <p>{emp.email}</p>
            </div>

            <button
              className="enable-btn"
              onClick={() => enableEmployee(emp._id)}
            >
              Enable
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DisabledEmployees;
