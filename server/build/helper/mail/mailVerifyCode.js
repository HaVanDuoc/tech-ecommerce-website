const mailVerifyCode = ({
  code
}) => {
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
                                                <p>Xin chào,</p>
                                                <p>
                                                    Chúng nhận được yêu cầu đặt lại mật khẩu Tech của bạn. <br />
                                                    Nhập mã đặt lại mật khẩu sau đây:
                                                </p>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <div style="text-align: center">
                                                <p
                                                    style="
                                                        font-weight: bold;
                                                        font-size: 20px;
                                                        padding: 20px 30px;
                                                        background-color: #e7f3ff;
                                                        border: 1px solid dodgerblue;
                                                        border-radius: 5px;
                                                    "
                                                >
                                                    ${code}
                                                </p>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <p><b>Bạn đã không yêu cầu thay đổi này?</b></p>
                                            <p>Nếu bạn không yêu cầu mật khẩu mới, hãy cho chúng tôi biết.</p>
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
    `;
};
module.exports = mailVerifyCode;