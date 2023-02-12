import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLayout from "./admin/layouts";
import { DefaultLayout } from "./layouts";
import { privateRoutes, publicRoutes } from "./Routes";

const App = () => {
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
