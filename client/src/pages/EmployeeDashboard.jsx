import Layout from "../components/Layout";
import { Link } from "react-router-dom";

function EmployeeDashboard() {
  return (
    <Layout
      title="Employee Dashboard"
      sidebar={
        <>
          <Link to="/employee/attendance">Attendance</Link>
          <Link to="/employee/payroll">Payroll</Link>
        </>
      }
    >
      <div className="card-grid">
        <Link to="/employee/attendance"><div className="card">🕘 Check In / Check Out</div></Link>
        <Link to="/employee/payroll"><div className="card">💵 Monthly Payroll</div></Link>
      </div>
    </Layout>
  );
}

export default EmployeeDashboard;
