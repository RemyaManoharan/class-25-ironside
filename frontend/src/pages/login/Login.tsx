import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/authContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { login, currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      return navigate("/dashboard");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during login:", error);

      setError("faild to login check your info");
    }

    setLoading(false);
  };

  return (
    <>
      <div>
        <div>
          <h2>login</h2>
          {error && <p>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button disabled={loading} type="submit">
              login
            </button>
          </form>
        </div>
      </div>
      <div>
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
      <div>
        forgot password ? <Link to="/password">reset password</Link>
      </div>
    </>
  );
}

export default LoginPage;
