import React, { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";

function Dashbord() {
  const { logout, currentUser } = useContext(AuthContext);
  console.log(currentUser);
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
      <div>this is dashboard</div>
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

export default Dashbord;
