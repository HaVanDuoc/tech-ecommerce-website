import { useEffect, useState } from "react"
import "./widgetSm.css"
import VisibilityIcon from "@mui/icons-material/Visibility"
import axiosInstance from "~/api"
import { FormatFullName } from "~/helper/format"
import { Avatar } from "@mui/material"

export default function WidgetSm() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const request = async () => {
            const response = await axiosInstance("post", "/user/getUsers", {})
            setUsers(response.data.data.list)
        }

        request()
    }, [])

    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">Khách hàng mới</span>
            <ul className="widgetSmList">
                {users.length &&
                    users.slice(0, 4).map((item, index) => {
                        const avatar = item.avatar
                        const fullName = FormatFullName(item.firstName, item.middleName, item.lastName)

                        return (
                            <li className="widgetSmListItem" key={index}>
                                <Avatar src={avatar} sx={{ mr: 2 }} />
                                <div className="widgetSmUser">
                                    <span className="widgetSmUsername">{fullName}</span>
                                    <span className="widgetSmUserTitle">Lập trình viên</span>
                                </div>
                                <button className="widgetSmButton">
                                    <VisibilityIcon className="widgetSmIcon" />
                                    Xem
                                </button>
                            </li>
                        )
                    })}
            </ul>
        </div>
    )
}
