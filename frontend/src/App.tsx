import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUpPage from "./pages/signup/Signup";
import LoginPage from "./pages/login/Login";
import { AuthProvider } from "./contexts/authContext";
import ResetPassword from "./pages/password/Reset";
import PrivateRoute from "./routes/PrivateRoute";
import Main from "./pages/main/Main";
import Home from "./pages/home/Home";
import Schedule from "./pages/schedule/Schedule";
import Company from "./pages/company/Company";
import Messages from "./pages/messages/Messages";
import History from "./pages/history/History";
import EventPage from "./pages/eventPage/EventPage";

const router = createBrowserRouter([
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/password",
    element: <ResetPassword />,
  },
  {
    path: "/",
    element: <PrivateRoute component={Main} />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/event",
        element: <EventPage />,
      },
      {
        path: "/schedule",
        element: <Schedule />,
      },
      {
        path: "/history",
        element: <History />,
      },
      {
        path: "/company",
        element: <Company />,
      },
      {
        path: "/messages",
        element: <Messages />,
      },
    ],
  },
]);

function App(): JSX.Element {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
