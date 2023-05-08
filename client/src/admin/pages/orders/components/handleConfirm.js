export const CHO_XAC_NHAN = "Chờ xác nhận";
export const CHO_LAY_HANG = "Chờ lấy hàng";
export const DANG_GIAO = "Đang giao";
export const DA_GIAO = "Đã giao";
export const DA_HUY = "Đã hủy";
export const TRA_HANG = "Trả hàng";

// Action confirm
export const actionConfirm = {
  XAC_NHAN_DON_HANG: "Xác nhận đơn hàng",
  DA_LAY_HANG: "Đã lấy hàng",
  XEM_DANG_GIA: "Xem đánh giá",
  MUA_LAI: "Mua lại",
  DA_GIAO: "Đã giao",
  TRA_HANG: "Trả hàng",
};

export const handleButtonConfirm = (status) => {
  switch (status) {
    case CHO_XAC_NHAN:
      return { action: [actionConfirm.XAC_NHAN_DON_HANG] };

    case CHO_LAY_HANG:
      return { action: [actionConfirm.DA_LAY_HANG] };

    case DANG_GIAO:
      return { action: [actionConfirm.DA_GIAO, actionConfirm.TRA_HANG] };

    case DA_GIAO:
      return { action: [actionConfirm.XEM_DANG_GIA] };

    case TRA_HANG:
      return { action: [actionConfirm.MUA_LAI] };

    case DA_HUY:
      return { action: [actionConfirm.MUA_LAI] };

    default:
      break;
  }
};
