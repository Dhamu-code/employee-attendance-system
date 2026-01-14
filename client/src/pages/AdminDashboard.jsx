import Layout from "../components/Layout";
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <Layout
      title="Admin Dashboard"
      sidebar={
        <>
          <Link to="/admin/employees">Employees</Link>
          <Link to="/admin/employees/disabled">Disabled Employees</Link>
          <Link to="/admin/create-employee">Create Employee</Link>
          <Link to="/admin/payroll">Payroll</Link>
        </>
      }
    >
      <div className="card-grid">
        <Link to="/admin/employees"><div className="card">👥 Manage Employees</div></Link>
        <Link to="/admin/attendance"><div className="card">📅 Attendance Records</div></Link>
        <Link to="/admin/payroll"><div className="card">💰 Payroll Reports</div></Link>
      </div>
    </Layout>
  );
}

export default AdminDashboard;
