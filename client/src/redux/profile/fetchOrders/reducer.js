export const TatCa = "Tất cả";
export const ChoXacNhan = "Chờ xác nhận";
export const ChoLayHang = "Chờ lấy hàng";
export const DangGiao = "Đang giao";
export const DaGiao = "Đã giao";
export const DaHuy = "Đã hủy";
export const TraHang = "Trả hàng";

const INIT_STATE = {
  TatCa: {
    isFetch: false,
    tab: null,
    orders: null,
  },
  ChoXacNhan: {
    isFetch: false,
    tab: null,
    orders: null,
  },
  ChoLayHang: {
    isFetch: false,
    tab: null,
    orders: null,
  },
  DangGiao: {
    isFetch: false,
    tab: null,
    orders: null,
  },
  DaGiao: {
    isFetch: false,
    tab: null,
    orders: null,
  },
  DaHuy: {
    isFetch: false,
    tab: null,
    orders: null,
  },
  TraHang: {
    isFetch: false,
    tab: null,
    orders: null,
  },
};

const OrderReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case TatCa:
      INIT_STATE.TatCa.isFetch = true;
      INIT_STATE.TatCa.tab = TatCa;
      INIT_STATE.TatCa.orders = action.payload;
      return state;

    case ChoXacNhan:
      INIT_STATE.ChoXacNhan.isFetch = true;
      INIT_STATE.ChoXacNhan.tab = ChoXacNhan;
      INIT_STATE.ChoXacNhan.orders = action.payload;
      return state;

    case ChoLayHang:
      INIT_STATE.ChoLayHang.isFetch = true;
      INIT_STATE.ChoLayHang.tab = ChoLayHang;
      INIT_STATE.ChoLayHang.orders = action.payload;
      return state;

    case DangGiao:
      INIT_STATE.DangGiao.isFetch = true;
      INIT_STATE.DangGiao.tab = DangGiao;
      INIT_STATE.DangGiao.orders = action.payload;
      return state;

    case DaGiao:
      INIT_STATE.DaGiao.isFetch = true;
      INIT_STATE.DaGiao.tab = DaGiao;
      INIT_STATE.DaGiao.orders = action.payload;
      return state;

    case DaHuy:
      INIT_STATE.DaHuy.isFetch = true;
      INIT_STATE.DaHuy.tab = DaHuy;
      INIT_STATE.DaHuy.orders = action.payload;
      return state;

    case TraHang:
      INIT_STATE.TraHang.isFetch = true;
      INIT_STATE.TraHang.tab = TraHang;
      INIT_STATE.TraHang.orders = action.payload;
      return state;

    default:
      return state;
  }
};

export default OrderReducer;

export const selectorOrders = (state) => state.ProfileFetchOrders;
