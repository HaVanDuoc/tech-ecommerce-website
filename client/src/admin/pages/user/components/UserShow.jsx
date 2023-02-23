import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import formatPhoneNumber from "~/helper/formatPhoneNumber";
import { Avatar } from "@mui/material";
import { useParams } from "react-router-dom";
import { FetchUser } from "~/helper/fetch";
import React from "react";

const UserShow = () => {
  const [user, setUser] = React.useState({});

  // Lấy UID từ url hiện tại
  const userId = useParams().userId;

  // Fetch thông tin user
  const response = FetchUser(userId);
  React.useEffect(() => {
    setUser(response);
  }, [response]);

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
  } = user;

  const AccountDetails = [
    { value: userName, icon: <PermIdentityIcon className="userShowIcon" /> },
    { value: dateOfBirth, icon: <CakeOutlinedIcon className="userShowIcon" /> },
    {
      value: transactionVolume,
      icon: <AttachMoneyIcon className="userShowIcon" />,
    },
    { value: status, icon: <TaskAltOutlinedIcon className="userShowIcon" /> },
    { value: role, icon: <WorkspacePremiumIcon className="userShowIcon" /> },
  ];

  const ContactDetails = [
    {
      value: formatPhoneNumber(phoneNumber),
      icon: <PhoneIphoneOutlinedIcon className="userShowIcon" />,
    },
    {
      value: email,
      icon: <EmailOutlinedIcon className="userShowIcon" />,
    },
    {
      value: address,
      icon: <LocationOnOutlinedIcon className="userShowIcon" />,
    },
  ];

  // FullName
  const fullName =
    (firstName || "") + " " + (middleName || "") + " " + (lastName || "");
  return (
    <div className="userShow">
      <div className="userShowTop">
        <Avatar alt="avatar" src={avatar} />

        <div className="userShowTopTitle">
          <span className="userShowUsername">{fullName}</span>
          <span className="userShowUserTitle">Software Engineer</span>
        </div>
      </div>
      <div className="userShowBottom">
        {/* Account Details */}
        <span className="userShowTitle">Account Details</span>
        {AccountDetails.map((item, index) => {
          return (
            item.value && (
              <div className="userShowInfo" key={index}>
                {item.icon}
                <span className="userShowInfoTitle">{item.value}</span>
              </div>
            )
          );
        })}

        {/* Contact Details */}
        <span className="userShowTitle">Contact Details</span>
        {ContactDetails.map((item, index) => {
          return (
            item.value && (
              <div className="userShowInfo" key={index}>
                {item.icon}
                <span className="userShowInfoTitle">{item.value}</span>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default UserShow;
