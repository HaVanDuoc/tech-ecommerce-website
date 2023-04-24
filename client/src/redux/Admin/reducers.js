const INTI_STATE = {
  KhachHang: {
    isFetch: false,
    payload: {},
  },
  SanPham: {
    isFetch: false,
    payload: {},
  },
  DonHang: {
    isFetch: false,
    payload: {},
  },
};

export const AdminReducer = (state = INTI_STATE, action) => {
  switch (action.type) {
    case "Khách hàng":
      state.KhachHang.isFetch = true;
      state.KhachHang.countPage = action.countPage;
      state.KhachHang.limit = action.limit;
      state.KhachHang.payload[`page-${action.currentPage}`] = action.payload;
      return state;

    case "Sản phẩm":
      state.SanPham.isFetch = true;
      state.SanPham.countPage = action.countPage;
      state.SanPham.limit = action.limit;
      state.SanPham.payload[`page-${action.currentPage}`] = action.payload;
      return state;

    case "Đơn hàng":
      state.DonHang.isFetch = true;
      state.DonHang.countPage = action.countPage;
      state.DonHang.limit = action.limit;
      state.DonHang.payload[`page-${action.currentPage}`] = action.payload;
      return state;

    default:
      return state;
  }
};

export const selectorKhachHang = (state) => state.Admin.KhachHang;
export const selectorSanPham = (state) => state.Admin.SanPham;
export const selectorDonHang = (state) => state.Admin.DonHang;
