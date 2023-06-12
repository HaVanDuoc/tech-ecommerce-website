import HeaderProfile from "./components/HeaderProfile"
import Background from "./components/Background"
import InfoBar from "./components/InfoBar"
import React, { Fragment } from "react"
import Feed from "./components/Feed"

const Profile = () => {
    return (
        <Fragment>
            <HeaderProfile />
            <Background />
            <InfoBar />
            <Feed />
        </Fragment>
    )
}

export default Profile
