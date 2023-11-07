import { useState } from "react";
import axios from "axios";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import Menu from "./pages/Menu/Menu";
import { store } from "./redux/store";
import Builder from "./pages/Builder/Builder";
import WebsitePreview from "./pages/Builder/components/WebsitePreview";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound.js/NotFound";
import SignUp from "./pages/SignUp/SignUp";

function ProtectedRoute({ redirectPath = "/", children }) {
  const user = useSelector((store) => store.auth.user);
  console.log("user", user);
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
}
export function FastMenu(props) {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="menu/:companyName" element={<Menu />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />

            <Route
              path="Dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="builder"
              element={
                <ProtectedRoute>
                  <Builder />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}
