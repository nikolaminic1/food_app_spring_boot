import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { CookiesProvider } from "react-cookie";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  HashRouter,
} from "react-router-dom";
import { Provider } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import ErrorBoundary from "antd/lib/alert/ErrorBoundary";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./app/store";
import { ThemeProvider } from "styled-components";
import { theme } from "./style/constants";
import "./App.css";
import "./index.css";
import "./index.css";
// import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "react-awesome-lightbox/build/style.css";
import Layout from "./layout/CLayout";
import { ConfigProvider } from "antd";
import Home from "./pages/Home";
import Profile from "./pages/auth/Profile";
import Restaurants from "./pages/restaurant/Restaurants";
import Order from "./pages/order/Order";
import PrivateRoutes from "./components/PrivateRoutes";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AccountActivation from "./pages/auth/AccountActivation";
import PasswordReset from "./pages/auth/PasswordReset";
import PasswordResetConfirmation from "./pages/auth/PasswordResetConfirmation";
import UserDelete from "./pages/auth/UserDelete";
import UserDeleteConfirmation from "./pages/auth/UserDeleteConfirmation";
import Restaurant from "./pages/restaurant/Restaurant";

function App() {
  return (
    <ErrorBoundary>
      <CookiesProvider>
        <ConfigProvider theme={{ hashed: false }}>
          <ThemeProvider theme={theme}>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                  <Layout>
                    <Routes>
                      <Route element={<PrivateRoutes />}>
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/order" element={<Order />} />
                      </Route>
                      <Route path="/" element={<Home />} />
                      <Route path="/restaurants">
                        <Route index={true} element={<Restaurants />} />
                        <Route path=":id" element={<Restaurant />} />
                      </Route>
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route
                        path="/account-activation"
                        element={<AccountActivation />}
                      />
                      <Route
                        path="/password-reset"
                        element={<PasswordReset />}
                      />
                      <Route
                        path="/password-reset-confirmation"
                        element={<PasswordResetConfirmation />}
                      />
                      <Route path="/user-delete" element={<UserDelete />} />
                      <Route
                        path="/user-delete-confirmation"
                        element={<UserDeleteConfirmation />}
                      />
                    </Routes>
                  </Layout>
                </BrowserRouter>
              </PersistGate>
            </Provider>
          </ThemeProvider>
        </ConfigProvider>
      </CookiesProvider>
    </ErrorBoundary>
  );
}

export default App;
