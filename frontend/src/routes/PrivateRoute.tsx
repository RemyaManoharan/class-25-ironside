import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { Navigate } from "react-router-dom";

interface Props {
  component: React.ComponentType;
}

export const PrivateRoute: React.FC<Props> = ({
  component: RouteComponent,
}) => {
  const { currentUser } = useContext(AuthContext);
  console.log({currentUser});
  if (currentUser) {
    return <RouteComponent />;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;
