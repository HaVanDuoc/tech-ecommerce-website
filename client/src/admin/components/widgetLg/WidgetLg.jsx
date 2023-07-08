import { useEffect, useState } from "react"
import "./widgetLg.css"
import axiosInstance from "~/api"
import { Avatar } from "@mui/material"
import { FormatFullName, formatVND } from "~/helper/format"
import dayjs from "dayjs"

export default function WidgetLg() {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const request = async () => {
            const response = await axiosInstance("post", "/order/getOrders", {})
            setOrders(response.data.data.payload)
        }

        request()
    }, [])

    const Button = ({ type }) => {
        return <button className={"widgetLgButton " + type}>{type}</button>
    }
    return (
        <div className="widgetLg">
            <h3 className="widgetLgTitle">Giao dịch mới nhất</h3>
            <table className="widgetLgTable">
                <tr className="widgetLgTr">
                    <th className="widgetLgTh">Khách hàng</th>
                    <th className="widgetLgTh">Ngày</th>
                    <th className="widgetLgTh">Tổng thanh toán</th>
                    <th className="widgetLgTh">Trạng thái</th>
                </tr>

                {orders.length &&
                    orders.slice(0, 4).map((item) => {
                        const id = item.id
                        const fullName = FormatFullName(item.firstName, item.middleName, item.lastName)
                        const avatar = item.avatar
                        const createdAt = String(dayjs(item.createdAt).format("DD/MM/YYYY"))
                        const pay = formatVND(item.total)
                        const status = item.status

                        return (
                            <tr className="widgetLgTr" key={id}>
                                <td className="widgetLgUser">
                                    <Avatar src={avatar} sx={{ mr: 2 }} />
                                    <span className="widgetLgName">{fullName}</span>
                                </td>
                                <td className="widgetLgDate">{createdAt}</td>
                                <td className="widgetLgAmount">{pay}</td>
                                <td className="widgetLgStatus">
                                    <Button type={status} />
                                </td>
                            </tr>
                        )
                    })}
            </table>
        </div>
    )
}
