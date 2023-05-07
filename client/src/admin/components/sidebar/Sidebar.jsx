import "./sidebar.css";
import { Link, useParams } from "react-router-dom";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import TimelineIcon from "@mui/icons-material/Timeline";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BarChartIcon from "@mui/icons-material/BarChart";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import ReportIcon from "@mui/icons-material/Report";
import DbManagement from "./components/DbManagement";
import Display from "./components/Display";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Bảng điều khiển</h3>
          <ul className="sidebarList">
            <Link to="/admin" className="link">
              <li className="sidebarListItem active">
                <LineStyleIcon className="sidebarIcon" />
                Trang chủ
              </li>
            </Link>
            <li className="sidebarListItem">
              <TimelineIcon className="sidebarIcon" />
              Phân tích
            </li>
            <li className="sidebarListItem">
              <TrendingUpIcon className="sidebarIcon" />
              Doanh thu
            </li>
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quản lý</h3>
          <ul className="sidebarList">
            <Link to="/admin/users" className="link">
              <li className="sidebarListItem">
                <PermIdentityIcon className="sidebarIcon" />
                Khách hàng
              </li>
            </Link>
            <Link to="/admin/products" className="link">
              <li className="sidebarListItem">
                <StorefrontIcon className="sidebarIcon" />
                Sản phẩm
              </li>
            </Link>
            <Link to="/admin/orders" className="link">
              <li className="sidebarListItem">
                <AttachMoneyIcon className="sidebarIcon" />
                Đơn hàng
              </li>
            </Link>
            <li className="sidebarListItem">
              <BarChartIcon className="sidebarIcon" />
              Báo cáo
            </li>
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Thông báo</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutlineIcon className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeedIcon className="sidebarIcon" />
              Phản hồi
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutlineIcon className="sidebarIcon" />
              Tin nhắn
            </li>
          </ul>
        </div>

        <div className="sidebarMenu">
          <Display />
        </div>

        <div className="sidebarMenu">
          <DbManagement />
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Nhân sự</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <WorkOutlineIcon className="sidebarIcon" />
              Nhân viên
            </li>
            <li className="sidebarListItem">
              <TimelineIcon className="sidebarIcon" />
              PHân tích
            </li>
            <li className="sidebarListItem">
              <ReportIcon className="sidebarIcon" />
              Báo cáo
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
