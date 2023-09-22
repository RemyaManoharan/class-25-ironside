import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import SignUpPage from "./pages/signup/Signup";
import LoginPage from "./pages/login/Login";
import { AuthProvider } from "./contexts/authContext";
import ResetPassword from "./pages/password/Reset";
import Dashboard from "./pages/dashbord/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import Header from "./pages/header/Header";

const router = createBrowserRouter(
  createRoutesFromElements(
    <React.Fragment>
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/password" element={<ResetPassword />} />
      <Route
        path="/"
        element={
          <>
            <PrivateRoute component={Header} />
            <PrivateRoute component={Dashboard} />
          </>
        }
      />

      <Route path="*" element={<Navigate to="/login" />} />
    </React.Fragment>
  )
);

function App(): JSX.Element {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
