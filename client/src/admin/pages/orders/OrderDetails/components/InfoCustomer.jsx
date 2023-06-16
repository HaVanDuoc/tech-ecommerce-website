import { Stack } from "@mui/material"
import React from "react"
import Title from "./Title"
import { FormatFullName } from "~/helper/format"
import dayjs from "dayjs"
import FieldInfo from "./FieldInfo"

const InfoCustomer = ({ firstName, middleName, lastName, dateOfBirth, gender, address }) => {
    const personal = [
        {
            field: "Khách hàng:",
            value: FormatFullName(firstName, middleName, lastName),
        },
        {
            field: "Sinh ngày:",
            value: dayjs(dateOfBirth).format("DD/MM/YYYY"),
        },
        { field: "Giới tính:", value: gender },
        { field: "Địa chỉ:", value: address },
    ]

    return (
        <Stack className="section">
            <Title>Thông tin khách hàng</Title>

            {personal.map((item, index) => {
                return <FieldInfo index={index} name={item.field} value={item.value} />
            })}
        </Stack>
    )
}

export default InfoCustomer
