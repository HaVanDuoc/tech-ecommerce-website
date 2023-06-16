import { Stack } from "@mui/material"
import React from "react"
import Title from "./Title"
import { formatPhoneNumber } from "~/helper/format"
import FieldInfo from "./FieldInfo"

const InfoContact = ({ phoneNumber, email }) => {
    const contact = [
        {
            field: "Số điện thoại:",
            value: formatPhoneNumber(phoneNumber),
        },
        {
            field: "Email:",
            value: email,
        },
    ]

    return (
        <Stack className="section" marginLeft={2} marginRight={2}>
            <Title>Thông tin liên hệ</Title>

            {contact.map((item, index) => {
                return <FieldInfo index={index} name={item.field} value={item.value} />
            })}
        </Stack>
    )
}

export default InfoContact
