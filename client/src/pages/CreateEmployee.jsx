import { useState } from "react";
import API from "../services/api";

function CreateEmployee() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    hourlyRate: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await API.post("/admin/employee", form);
      alert("Employee created");
      setForm({ name: "", email: "", password: "", hourlyRate: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="create-employee-page">
      <div className="create-card">
        <h2>Create Employee</h2>

        <form onSubmit={submitHandler}>
          <input
            placeholder="Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            placeholder="Email Address"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Temporary Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <input
            placeholder="Hourly Rate (₹)"
            value={form.hourlyRate}
            onChange={(e) =>
              setForm({ ...form, hourlyRate: e.target.value })
            }
          />

          <button type="submit">Create Employee</button>
        </form>
      </div>
    </div>
  );
}

export default CreateEmployee;
