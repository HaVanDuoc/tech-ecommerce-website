const MailVerifyRegister = ({ client_host, token }) => {
    return `        
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Tech Mail Verify Register</title>
        </head>
    
        <body style="margin: 0; padding: 0">
            <table style="color: #333; font-family: 'Montserrat', sans-serif !important; font-size: 16px; width: 100%">
                <tbody>
                    <tr>
                        <td>
                            <div style="max-width: 550px; margin: 0 auto">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div
                                                    style="
                                                        display: flex;
                                                        width: 100%;
                                                        border-bottom: 1px solid lightgray;
                                                        padding-bottom: 10px;
                                                        margin-bottom: 20px;
                                                    "
                                                >
                                                    <div
                                                        style="
                                                            font-size: 35px;
                                                            font-weight: 600;
                                                            color: dodgerblue;
                                                            margin: 0 auto;
                                                        "
                                                    >
                                                        Tech
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
    
                                        <tr>
                                            <td>
                                                <div>
                                                    <p>Chào bạn,</p>
                                                    <p>
                                                        Đây là thư kích hoạt tài khoản Tech của bạn. Thư có hiệu lực
                                                        <b>10 phút</b>, từ lúc bạn nhận được thư này!
                                                    </p>
                                                    <p>Chọn <b>kích hoạt</b> để kích hoạt tài khoản:</p>
                                                </div>
                                            </td>
                                        </tr>
    
                                        <tbody align="center">
                                            <tr>
                                                <td>
                                                    <div style="display: flex; height: 30px;"></div>
                                                    <a
                                                        href="${client_host}/verifyEmail?token=${token}"
                                                        style="
                                                            background-color: green;
                                                            color: #fff;
                                                            font-size: 25px;
                                                            font-weight: 600;
                                                            text-transform: uppercase;
                                                            padding: 15px 70px;
                                                            border-radius: 5px;
                                                            text-decoration: none;
                                                            cursor: pointer;
                                                        "
                                                        >Kích hoạt</a
                                                    >
                                                    <div style="display: flex; height: 30px;"></div>
                                                </td>
                                            </tr>
                                        </tbody>
    
                                        <tr>
                                            <td>
                                                <div>
                                                    <p>
                                                        Nếu bạn không phải là người gửi yêu cầu này, hãy bỏ qua bức thư này.
                                                    </p>
                                                    <p>Cảm ơn bạn!.</p>
                                                    <p>Đội ngũ bảo mật của Tech</p>
                                                </div>
                                            </td>
                                        </tr>
    
                                        <tr>
                                            <td>
                                                <div
                                                    style="
                                                        display: flex;
                                                        width: 100%;
                                                        border-top: 1px solid lightgray;
                                                        margin-top: 30px;
                                                        padding-top: 30px;
                                                    "
                                                >
                                                    <table>
                                                        <tbody align="center">
                                                            <tr>
                                                                <td>
                                                                    <div style="color: #aaa">từ</div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div
                                                                        style="
                                                                            font-size: 20px;
                                                                            font-weight: 600;
                                                                            color: dodgerblue;
                                                                            margin: 7px auto;
                                                                        "
                                                                    >
                                                                        Tech
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div
                                                                        style="
                                                                            font-size: 13px;
                                                                            color: #aaa;
                                                                            margin: 8px auto;
                                                                        "
                                                                    >
                                                                        Đây là dịch vụ thư thông báo.
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div
                                                                        style="
                                                                            font-size: 13px;
                                                                            color: #aaa;
                                                                            text-align: center;
                                                                        "
                                                                    >
                                                                        © Tech. Meta Platforms, Inc., Attention: Community
                                                                        Support, 1 Tech Way, Menlo Park, CA 94025
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </body>
    </html>    
    `
}

module.exports = MailVerifyRegister
