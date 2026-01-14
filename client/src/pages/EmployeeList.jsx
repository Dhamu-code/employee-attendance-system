import { useEffect, useState } from "react";
import API from "../services/api";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [editEmp, setEditEmp] = useState(null);

  const loadEmployees = async () => {
    const res = await API.get("/admin/employees");
    setEmployees(res.data);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const disableEmployee = async (id) => {
    if (!window.confirm("Disable employee?")) return;
    await API.delete(`/admin/employee/${id}`);
    loadEmployees();
  };

  const startEdit = (emp) => {
    setEditEmp({
      _id: emp._id,
      name: emp.name,
      email: emp.email,
      hourlyRate: emp.hourlyRate,
    });
  };

  const saveEdit = async () => {
    try {
      await API.put(`/admin/employee/${editEmp._id}`, {
        name: editEmp.name,
        email: editEmp.email,
        hourlyRate: editEmp.hourlyRate,
      });
      alert("Employee updated");
      setEditEmp(null);
      loadEmployees();
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  const resetPassword = async (id) => {
    const newPassword = prompt("Enter new password for employee:");
    if (!newPassword) return;

    try {
      await API.put(`/admin/employee/${id}/reset-password`, {
        newPassword,
      });
      alert("Password reset successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="employee-page">
      <h2 className="page-title">Employees</h2>

      {employees.length === 0 && (
        <p className="empty-text">No active employees</p>
      )}

      <div className="employee-list">
        {employees.map((emp) => (
          <div key={emp._id} className="employee-card">
            <div className="employee-info">
              <h4>{emp.name}</h4>
              <p>{emp.email}</p>
              <span>₹{emp.hourlyRate} / hour</span>
            </div>

            <div className="employee-actions">
              <button className="btn edit" onClick={() => startEdit(emp)}>
                Edit
              </button>
              <button
                className="btn reset"
                onClick={() => resetPassword(emp._id)}
              >
                Reset Password
              </button>
              <button
                className="btn disable"
                onClick={() => disableEmployee(emp._id)}
              >
                Disable
              </button>
            </div>
          </div>
        ))}
      </div>

      {editEmp && (
        <div className="edit-box">
          <h3>Edit Employee</h3>

          <input
            value={editEmp.name}
            onChange={(e) =>
              setEditEmp({ ...editEmp, name: e.target.value })
            }
            placeholder="Name"
          />

          <input
            value={editEmp.email}
            onChange={(e) =>
              setEditEmp({ ...editEmp, email: e.target.value })
            }
            placeholder="Email"
          />

          <input
            value={editEmp.hourlyRate}
            onChange={(e) =>
              setEditEmp({ ...editEmp, hourlyRate: e.target.value })
            }
            placeholder="Hourly Rate"
          />

          <div className="edit-actions">
            <button className="btn save" onClick={saveEdit}>
              Save
            </button>
            <button
              className="btn cancel"
              onClick={() => setEditEmp(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeList;
