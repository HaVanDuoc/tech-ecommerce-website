import PermIdentityIcon from "@mui/icons-material/PermIdentity"
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined"
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined"
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined"
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined"
import TransgenderOutlinedIcon from "@mui/icons-material/TransgenderOutlined"
import { Avatar, Tooltip } from "@mui/material"
import { FormatFullName, formatPhoneNumber, formatVND } from "~/helper/format"
import { useSelector } from "react-redux"
import { selectorUser } from "~/redux/userSlice"
import React from "react"
import dayjs from "dayjs"

const UserShow = () => {
    const data = useSelector(selectorUser)?.data

    const {
        firstName,
        middleName,
        lastName,
        avatar,
        userName,
        role,
        transactionVolume,
        dateOfBirth,
        phoneNumber,
        email,
        address,
        status,
        gender,
    } = data

    const AccountDetails = [
        {
            tooltip: "Tên người dùng",
            value: userName,
            icon: <PermIdentityIcon className="userShowIcon" />,
        },
        {
            tooltip: "Tổng mua",
            value: formatVND(transactionVolume),
            icon: <AttachMoneyIcon className="userShowIcon" />,
        },
        {
            tooltip: "Ngày sinh",
            value: String(dayjs(dateOfBirth).format("DD/MM/YYYY")),
            icon: <CakeOutlinedIcon className="userShowIcon" />,
        },
        {
            tooltip: "Giới tính",
            value: gender,
            icon: <TransgenderOutlinedIcon className="userShowIcon" />,
        },
        {
            tooltip: "Trạng thái",
            value: status,
            icon: <TaskAltOutlinedIcon className="userShowIcon" />,
        },
        {
            tooltip: "Tài khoản thuộc quyền hạn",
            value: role,
            icon: <WorkspacePremiumIcon className="userShowIcon" />,
        },
    ]

    const ContactDetails = [
        {
            tooltip: "Số điện thoại",
            value: formatPhoneNumber(phoneNumber),
            icon: <PhoneIphoneOutlinedIcon className="userShowIcon" />,
        },
        {
            tooltip: "Email",
            value: email,
            icon: <EmailOutlinedIcon className="userShowIcon" />,
        },
        {
            tooltip: "Địa chỉ",
            value: address,
            icon: <LocationOnOutlinedIcon className="userShowIcon" />,
        },
    ]

    const fullName = FormatFullName(firstName, middleName, lastName)

    return (
        <div className="userShow">
            <div className="userShowTop">
                <Avatar alt="avatar" src={avatar} />

                <div className="userShowTopTitle">
                    <span className="userShowUsername">{fullName}</span>
                    <span className="userShowUserTitle">{role}</span>
                </div>
            </div>
            <div className="userShowBottom">
                <span className="userShowTitle">Thông tin cá nhân</span>

                {AccountDetails.map((item, index) => {
                    return (
                        item.value && (
                            <Tooltip title={item.tooltip} placement="left-start" key={index}>
                                <div className="userShowInfo">
                                    {item.icon}
                                    <span className="userShowInfoTitle">{item.value}</span>
                                </div>
                            </Tooltip>
                        )
                    )
                })}

                <span className="userShowTitle">Liên hệ</span>

                {ContactDetails.map((item, index) => {
                    return (
                        item.value && (
                            <Tooltip title={item.tooltip} placement="left-start" key={index}>
                                <div className="userShowInfo">
                                    {item.icon}
                                    <span className="userShowInfoTitle">{item.value}</span>
                                </div>
                            </Tooltip>
                        )
                    )
                })}
            </div>
        </div>
    )
}

export default UserShow
