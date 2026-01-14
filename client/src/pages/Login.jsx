import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("auth", JSON.stringify(res.data));

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/employee");
      }
    } catch (error) {
  console.error(error.response?.data || error.message);
  alert(error.response?.data?.message || "Login failed");
}

  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Employee System Login</h2>
        <p className="subtitle">Sign in to continue</p>

        <form onSubmit={submitHandler}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="login-btn" type="submit">
            Login
          </button>
        </form>

        <p className="footer-text">
          © {new Date().getFullYear()} Employee Attendance System
        </p>
      </div>
    </div>
  );
}

export default Login;
