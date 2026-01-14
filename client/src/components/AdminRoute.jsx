import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem("user"));

  if (!userData || userData.user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
