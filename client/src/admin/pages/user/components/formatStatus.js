export const formatStatus = (status) => {
  return status === "active"
    ? "Hoạt động"
    : status === "block"
    ? "Khóa"
    : "Vô hiệu hóa";
};
