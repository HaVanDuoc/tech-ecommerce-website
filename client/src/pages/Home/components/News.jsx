import { Box, Container, Stack, Typography } from "@mui/material"
import Title from "./Title"
import { Link } from "react-router-dom"
import Slider from "react-slick"
import { NextArrow, PrevArrow } from "~/styles/slider"
import { PF } from "~/utils/__variables"

const News = () => {
    return (
        <Box sx={styles1}>
            <Container maxWidth="lg" disableGutters>
                <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                    <Title>Bản tin mới nhất</Title>
                    <Link>
                        <Typography sx={styles2}>Xem tất cả</Typography>
                    </Link>
                </Stack>

                <Box>
                    <Slider
                        dots={false}
                        infinite={false}
                        speed={500}
                        slidesToShow={4}
                        slidesToScroll={4}
                        nextArrow={<NextArrow />}
                        prevArrow={<PrevArrow />}
                        className="custom-slider"
                    >
                        {news.map((item) => (
                            <Box key={item.id}>
                                <Box className="card-news">
                                    <Box className="card-media">
                                        <img src={PF + "/assets/news/" + item.img} alt="" />
                                    </Box>
                                    <Box className="card-content">
                                        <Typography className="createdAt">{item.createdAt}</Typography>
                                        <Typography className="title">{item.title}</Typography>
                                        <Typography className="content">{item.content}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </Slider>
                </Box>
            </Container>
        </Box>
    )
}

export default News

const styles1 = {
    backgroundColor: "var(--home-bg-second)",
    padding: "var(--padding-section)",

    ".card-news": {
        backgroundColor: "#fff",
        borderRadius: "7px",
        overflow: "hidden",
        boxShadow: "0 0 3px 1px rgba(0, 0, 0, 0.175)",
        cursor: "pointer",

        ":hover": {
            boxShadow: "0 0 5px 2px rgba(0, 0, 0, 0.25)",
        },

        ".card-media": {
            width: "100%",
            minHeight: "100px",

            img: {
                width: "100%",
            },
        },

        ".card-content": {
            padding: "24px 16px",

            ".createdAt": {
                fontSize: ".8rem",
                color: "#666",
            },

            ".title": {
                fontSize: "1rem",
                fontWeight: 500,
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                margin: "5px 0",
            },

            ".content": {
                display: "-webkit-box",
                "-webkit-line-clamp": "3",
                "-webkit-box-orient": "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontSize: ".9rem",
            },
        },
    },
}

const styles2 = {
    color: "var(--color-text)",
    textTransform: "uppercase",

    ":hover": {
        color: "var(--color-main)",
    },
}

export const news = [
    {
        id: 1,
        createdAt: "1 giờ trước",
        img: "1.jpg",
        title: `Người dùng còn không mặn mà, Lenovo quyết định rời khỏi thị trường gaming phone`,
        content: `Trong những tin tức gần đây, có thông tin cho rằng điện thoại chơi game không còn được người dùng quan tâm, vì dòng Legion của Lenovo và Black Shark của Xiaomi đều đã ngừng hoạt động. Dự đoán của tổng giám đốc điều hành Redmi, Lu Weibing, vào đầu năm nay dường như đã trở thành sự thật.`,
    },
    {
        id: 2,
        createdAt: "14 giờ trước",
        img: "2.jpg",
        title: `Galaxy S23 Ultra 5G chiến thắng 'áp đảo' các đối thủ 'đáng gờm' của nhà Apple và Google`,
        content: `Trong bài kiểm tra hiệu năng được thực hiện bởi "In Depth Tech Reviews" cho thấy, Galaxy S23 Ultra 5G đã có chiến thắng "áp đảo" so với các đối thủ "đáng gờm" là iPhone 14 Pro Max và Pixel 7 Pro. Nội dung bài kiểm tra là cho các thiết bị chạy các tác vụ siêu nặng trong 30 phút nhằm đánh giá tốc độ, hiệu năng và thời lượng pin của từng mẫu máy.`,
    },
    {
        id: 3,
        createdAt: "3 ngày trước",
        img: "3.jpg",
        title: `Dell Technologies ra mắt nhiều máy tính cá nhân mới giúp người dùng làm việc mọi lúc mọi nơi`,
        content: `Cách thức, địa điểm mà chúng ta làm việc đã có sự khác biệt. Cho dù đó là làm việc kết hợp (hybrid work), làm việc từ xa (remote work), làm việc linh hoạt (flexible work) hay làm việc tại văn phòng, tất cả đều có một điểm chung là công nghệ. Công nghệ mang đến tính bình đẳng để thúc đẩy sự phát triển của hợp tác làm việc và năng suất, từ đó mang đến những trải nghiệm linh hoạt và tự do hơn.`,
    },
    {
        id: 4,
        createdAt: "24/3/2023",
        img: "4.jpg",
        title: `Quá đã, nhà Táo khuyết vẫn còn deal ngon giảm 7 triệu đến cuối tháng này`,
        content: `Bạn vẫn còn cơ hội để mua những sản phẩm chất lượng của nhà Táo khuyết với mức giảm giá hấp dẫn. Không bỏ lỡ cơ hội để tiết kiệm 7 triệu đồng khi mua sản phẩm của Apple đến cuối tháng này. Các mẫu iPhone thế hệ trước lẫn mới nhất đều đang có mức giá ưu đãi hấp dẫn. Nhanh tay đặt hàng để sở hữu những sản phẩm công nghệ tốt nhất của Apple với giá tiết kiệm nhất! `,
    },
    {
        id: 5,
        createdAt: "",
        img: "4.jpg",
        title: `Quá đã, nhà Táo khuyết vẫn còn deal ngon giảm 7 triệu đến cuối tháng này`,
        content: `Bạn vẫn còn cơ hội để mua những sản phẩm chất lượng của nhà Táo khuyết với mức giảm giá hấp dẫn. Không bỏ lỡ cơ hội để tiết kiệm 7 triệu đồng khi mua sản phẩm của Apple đến cuối tháng này. Các mẫu iPhone thế hệ trước lẫn mới nhất đều đang có mức giá ưu đãi hấp dẫn. Nhanh tay đặt hàng để sở hữu những sản phẩm công nghệ tốt nhất của Apple với giá tiết kiệm nhất! `,
    },
]
