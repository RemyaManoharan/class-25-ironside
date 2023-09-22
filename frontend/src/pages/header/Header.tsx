import React, { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";

function Header() {
  const { logout, currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>this is header</div>
      <div>
        <strong>{currentUser.displayName}</strong> <br />
        <strong>Email:</strong> {currentUser.email}
      </div>
      <div>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
}

export default Header;
