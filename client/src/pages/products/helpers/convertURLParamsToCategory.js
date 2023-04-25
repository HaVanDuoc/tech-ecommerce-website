export const convertURLParamsToCategory = (params) => {
  switch (params) {
    case "dien-thoai":
      return "Điện thoại";

    case "tablet":
      return "Tablet";

    case "laptop":
      return "Laptop";

    case "tai-nghe":
      return "Tai nghe";

    case "dong-ho":
      return "Đồng hồ";

    case "pc":
      return "Pc";

    case "sim":
      return "Sim";

    case "may-giat":
      return "Máy giặt";

    case "tivi":
      return "Tivi";

    case "tu-lanh":
      return "Tủ lạnh";

    case "loa":
      return "Loa";

    case "quat-dieu-hoa":
      return "Quạt điều hòa";

    default:
      break;
  }
};
