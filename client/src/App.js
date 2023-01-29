import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./layouts";
import { publicRoutes } from "./Routes";

const App = () => {  
  return (
    <div className="__havanduoc">
      <BrowserRouter>
        <Routes>
          {publicRoutes.map((route, index) => {
            const path = route.path;
            const Layout = route.layout || DefaultLayout;
            const Page = route.page;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
