import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { resetPassword } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      await resetPassword(email);
      navigate("/login");
    } catch (error) {
      console.error("Error during reset:", error);
    }

    setLoading(false);
  };

  return (
    <>
      <div>
        <div>
          <h2>reset</h2>

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

            <button disabled={loading} type="submit">
              reset
            </button>
          </form>
        </div>
      </div>
      <div>
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}

export default ResetPassword;
