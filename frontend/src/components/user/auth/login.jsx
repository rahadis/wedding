import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, useDecodeToken } from "../../../_services/auth";

export default function Login() {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => localStorage.getItem("accessToken"));
  const decodeData = useDecodeToken(token);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await login(formData);
      localStorage.setItem("accessToken", response.token);
      localStorage.setItem("userInfo", JSON.stringify(response.user));
      setToken(response.token);

      if (response.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      setError(error?.response?.data?.message || "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  // ⬇️ Redirect otomatis jika token sudah tersimpan dan decode berhasil
  useEffect(() => {
    if (token && decodeData && decodeData.role) {
      if (decodeData.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [token, decodeData, navigate]);

  return (
    <div className="container-fluid d-flex justify-content-center mt-5">
      <div className="card shadow rounded-4 p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Sign in to your account</h2>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Your email
              </label>
              <input
                type="email"
                className="form-control rounded-pill"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control rounded-pill"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="terms" required />
              <label className="form-check-label" htmlFor="terms">
                I accept the{" "}
                <Link to="#" className="text-decoration-underline">
                  Terms and Conditions
                </Link>
              </label>
            </div>

            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-primary w-100 d-flex justify-content-center align-items-center">
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>

            <p className="text-center mb-0">
              Don’t have an account yet?{" "}
              <Link to="/register" className="text-primary">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
