import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLayout from "./admin/layouts";
import { DefaultLayout } from "./layouts";
import { CURRENT_USER } from "./redux/AuthCurrentUser/constant";
import { privateRoutes, publicRoutes } from "./Routes";
import GoToAdminPage from "./components/GoToAdminPage";
import axiosInstance from "./utils/axiosInstance";

const App = () => {
  const dispatch = useDispatch();

  const checkCurrentUser = useCallback(async () => {
    try {
      const response = await axiosInstance({
        method: "get",
        url: "/client/auth",
      });

      if (response?.data?.err === 0) {
        const user = response.data;

        dispatch({ type: CURRENT_USER, payload: user }); // Lưu user vào redux
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    checkCurrentUser();
  }, [checkCurrentUser]);

  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route, index) => {
          const path = route.path;
          const Layout = route.layout || DefaultLayout;
          const Page = route.page;
          return (
            <Route
              exact
              key={index}
              path={path}
              element={
                <div className="__havanduoc">
                  <Layout>
                    <Page />
                    <GoToAdminPage />
                  </Layout>
                </div>
              }
            />
          );
        })}

        {privateRoutes.map((route, index) => {
          const path = route.path;
          const Layout = route.layout || AdminLayout;
          const Page = route.page;
          return (
            <Route
              exact
              key={index}
              path={path}
              element={
                <div className="__havanduoc__admin">
                  <Layout>
                    <Page />
                    <GoToAdminPage />
                  </Layout>
                </div>
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
