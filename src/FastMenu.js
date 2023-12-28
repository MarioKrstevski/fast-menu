import { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";

import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Provider } from "react-redux";
import Menu from "./pages/Menu/Menu";
import { store } from "./redux/store";
import Builder from "./pages/Builder/Builder";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import SignUp from "./pages/SignUp/SignUp";
import { AuthProvider } from "react-auth-kit";
import { RequireAuth } from "react-auth-kit";
import AllExistingMenus from "./devComponents/AllExistingMenus";
import AllExistingUsers from "./devComponents/AllExistingUsers";
import { PrimeReactProvider } from "primereact/api";

export function FastMenu(props) {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Fast Menu enables you to quickly generate a digital menu that works everywhere"
        />
        <title>Fast Menu App</title>
        <link
          rel="icon"
          type="image/png"
          href="https://img.icons8.com/?size=64&id=104302&format=png"
        />
      </Helmet>
      <AuthProvider
        authType={"localstorage"}
        authName={"_auth"}
        cookieDomain={window.location.hostname}
        cookieSecure={false}
      >
        <Provider store={store}>
          <PrimeReactProvider>
            <BrowserRouter>
              <Routes>
                <Route path="menu/:subdomain" element={<Menu />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />

                <Route
                  path="Dashboard"
                  element={
                    <RequireAuth loginPath="/login">
                      <Dashboard />
                    </RequireAuth>
                  }
                />
                <Route
                  path="builder"
                  element={
                    <RequireAuth loginPath="/login">
                      <Builder />
                    </RequireAuth>
                  }
                />

                <Route
                  path="/allExistingMenus"
                  element={<AllExistingMenus />}
                />
                <Route
                  path="/allExistingUsers"
                  element={<AllExistingUsers />}
                />
                <Route
                  path="/"
                  element={<Navigate to={"/dashboard"} />}
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </PrimeReactProvider>

          <Toaster />
        </Provider>
      </AuthProvider>
    </div>
  );
}
