import "./components/user.css"
import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { requestGenderUser, requestRolesUser, requestStatusUser, requestUser } from "~/api"
import { useDispatch, useSelector } from "react-redux"
import UserShow from "./components/UserShow"
import UserUpdate from "./components/UserUpdate"
import { selectorUser } from "~/redux/userSlice"

export default function User() {
    const dispatch = useDispatch()
    const userId = useParams().userId
    const fetch = useSelector(selectorUser)

    useEffect(() => {
        requestUser(dispatch, { userId })
        if (!fetch.status.length) requestStatusUser(dispatch)
        if (!fetch.roles.length) requestRolesUser(dispatch)
        if (!fetch.gender.length) requestGenderUser(dispatch)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetch.refetch])

    return (
        <div className="user">
            <div className="userTitleContainer">
                <h1 className="userTitle">Thông tin khách hàng</h1>
            </div>
            <div className="userContainer">
                <UserShow />
                <UserUpdate />
            </div>
        </div>
    )
}
