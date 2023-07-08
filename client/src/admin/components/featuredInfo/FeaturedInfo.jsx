import "./featuredInfo.css"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"
import { Fragment, useEffect, useState } from "react"
import axiosInstance from "~/api"
import { formatVND } from "~/helper/format"

export default function FeaturedInfo() {
    const [revenue, setRevenue] = useState()

    const revenueCurrentMonth = revenue?.revenueCurrentMonth
    const revenuePrevMonth = revenue?.revenuePrevMonth
    const percent = ` ${revenueCurrentMonth < revenuePrevMonth ? "-" : "+"} ${Math.abs(
        Math.floor(100 - (revenueCurrentMonth / revenuePrevMonth) * 100)
    )}%`

    useEffect(() => {
        const request = async () => {
            const response = await axiosInstance("get", "/admin/getRevenue", {})
            setRevenue(response.data.data)
        }

        request()
    }, [])

    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">Doanh thu</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{formatVND(revenueCurrentMonth) || formatVND(0)}</span>
                    <span className="featuredMoneyRate">
                        {percent || <Fragment />}{" "}
                        {revenueCurrentMonth < revenuePrevMonth ? (
                            <ArrowDownwardIcon className="featuredIcon negative" />
                        ) : (
                            <ArrowUpwardIcon className="featuredIcon" />
                        )}
                    </span>
                </div>
                <span className="featuredSub">So với tháng trước</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Lợi nhuận</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">$4,415</span>
                    <span className="featuredMoneyRate">
                        -1.4 <ArrowDownwardIcon className="featuredIcon negative" />
                    </span>
                </div>
                <span className="featuredSub">So với tháng trước</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Chi phí</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">$2,225</span>
                    <span className="featuredMoneyRate">
                        +2.4 <ArrowUpwardIcon className="featuredIcon" />
                    </span>
                </div>
                <span className="featuredSub">So với tháng trước</span>
            </div>
        </div>
    )
}
