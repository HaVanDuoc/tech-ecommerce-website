import { BrowserRouter, Route, Routes } from "react-router-dom"
import { privateRoutes, publicRoutes } from "./Routes"
import React, { useEffect } from "react"
import AdminLayout from "./admin/layouts"
import { DefaultLayout } from "./layouts"
import { requestGetCurrentUser } from "./api"
import { useDispatch, useSelector } from "react-redux"
import ModalLogin from "./components/Auth/ModalLogin"
import { useSnackbar } from "notistack"
import { selectorResponse } from "./redux/alertSlice"
// import GoToAdminPage from "./components/GoToAdminPage"

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        requestGetCurrentUser(dispatch)
    }, [dispatch])

    const { enqueueSnackbar } = useSnackbar()
    const handleSnackBar = (res) => {
        if (res.data.err === 0) {
            enqueueSnackbar(res.data.msg, {
                variant: "success",
                anchorOrigin: { vertical: "top", horizontal: "center" },
                autoHideDuration: 4000,
            })
        } else {
            enqueueSnackbar(res.data.msg, {
                variant: "error",
                anchorOrigin: { vertical: "top", horizontal: "center" },
                autoHideDuration: 4000,
            })
        }
    }
    const response = useSelector(selectorResponse)
    console.log("response", response)

    useEffect(() => {
        if (response.payload) handleSnackBar(response.payload)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [response.export])

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
                                        <ModalLogin />
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
                                        <ModalLogin />
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
