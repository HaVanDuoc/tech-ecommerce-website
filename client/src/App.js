import { BrowserRouter, Route, Routes } from "react-router-dom"
import { privateRoutes, publicRoutes } from "./Routes"
import React, { useEffect } from "react"
import AdminLayout from "./admin/layouts"
import { DefaultLayout } from "./layouts"
import { requestGetCurrentUser } from "./api"
import { useDispatch } from "react-redux"
// import GoToAdminPage from "./components/GoToAdminPage"

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        requestGetCurrentUser(dispatch)
    }, [dispatch])

    return (
        <BrowserRouter>
            <Routes>
                {publicRoutes.map((route, index) => {
                    const path = route.path
                    const Layout = route.layout || DefaultLayout
                    const Page = route.page
                    return (
                        <Route
                            exact
                            key={index}
                            path={path}
                            element={
                                <div className="__havanduoc">
                                    <Layout>
                                        <Page />
                                        {/* <GoToAdminPage /> */}
                                    </Layout>
                                </div>
                            }
                        />
                    )
                })}

                {privateRoutes.map((route, index) => {
                    const path = route.path
                    const Layout = route.layout || AdminLayout
                    const Page = route.page
                    return (
                        <Route
                            exact
                            key={index}
                            path={path}
                            element={
                                <div className="__havanduoc__admin">
                                    <Layout>
                                        <Page />
                                        {/* <GoToAdminPage /> */}
                                    </Layout>
                                </div>
                            }
                        />
                    )
                })}
            </Routes>
        </BrowserRouter>
    )
}

export default App
