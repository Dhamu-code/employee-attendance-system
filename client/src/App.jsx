import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import CreateEmployee from "./pages/CreateEmployee";
import EmployeeList from "./pages/EmployeeList";
import EmployeeAttendance from "./pages/EmployeeAttendance";
import EmployeePayroll from "./pages/EmployeePayroll";
import AdminPayroll from "./pages/AdminPayroll";
import DisabledEmployees from "./pages/DisabledEmployees";
import AttendanceRecord from "./pages/AttendanceRecord";
import AdminRoute from "./components/AdminRoute";





function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/create-employee" element={<CreateEmployee />} />
        <Route path="/admin/employees" element={<EmployeeList />} />
        <Route path="/employee" element={<EmployeeDashboard />} />
        <Route path="/employee/attendance" element={<EmployeeAttendance />} />
        <Route path="/employee/payroll" element={<EmployeePayroll />} />
        <Route path="/admin/payroll" element={<AdminPayroll />} />
        <Route
          path="/admin/employees/disabled"
          element={<DisabledEmployees />}
        />
        <Route
          path="/admin/attendance"
          element={
            <AdminRoute>
              <AttendanceRecord />
            </AdminRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
