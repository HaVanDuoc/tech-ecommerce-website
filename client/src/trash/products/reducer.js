import { INIT_STATE_PRODUCTS } from "./constants";

export const ProductsReducer = (state = INIT_STATE_PRODUCTS, action) => {
  switch (action.type) {
    case "Điện thoại":
      state.dienthoai.isFetch = true;
      state.dienthoai.limit = action.limit;
      state.dienthoai.category = action.category;
      state.dienthoai.countPage = action.countPage;
      state.dienthoai.currentPage = action.currentPage;
      state.dienthoai.countProducts = action.countProducts;
      state.dienthoai.payload[`page-${action.currentPage}`] = action.payload;
      return state;

    case "Tablet":
      state.tablet.isFetch = true;
      state.tablet.limit = action.limit;
      state.tablet.category = action.category;
      state.tablet.countPage = action.countPage;
      state.tablet.currentPage = action.currentPage;
      state.tablet.countProducts = action.countProducts;
      state.tablet.payload[`page-${action.currentPage}`] = action.payload;
      return state;

    case "Laptop":
      state.laptop.isFetch = true;
      state.laptop.limit = action.limit;
      state.laptop.category = action.category;
      state.laptop.countPage = action.countPage;
      state.laptop.currentPage = action.currentPage;
      state.laptop.countProducts = action.countProducts;
      state.laptop.payload[`page-${action.currentPage}`] = action.payload;
      return state;

    case "Tai nghe":
      state.tainghe.isFetch = true;
      state.tainghe.limit = action.limit;
      state.tainghe.category = action.category;
      state.tainghe.countPage = action.countPage;
      state.tainghe.currentPage = action.currentPage;
      state.tainghe.countProducts = action.countProducts;
      state.tainghe.payload[`page-${action.currentPage}`] = action.payload;
      return state;

    case "Đồng hồ":
      state.dongho.isFetch = true;
      state.dongho.limit = action.limit;
      state.dongho.category = action.category;
      state.dongho.countPage = action.countPage;
      state.dongho.currentPage = action.currentPage;
      state.dongho.countProducts = action.countProducts;
      state.dongho.payload[`page-${action.currentPage}`] = action.payload;
      return state;

    case "Pc":
      state.pc.isFetch = true;
      state.pc.limit = action.limit;
      state.pc.category = action.category;
      state.pc.countPage = action.countPage;
      state.pc.currentPage = action.currentPage;
      state.pc.countProducts = action.countProducts;
      state.pc.payload[`page-${action.currentPage}`] = action.payload;
      return state;

    case "Sim":
      state.sim.isFetch = true;
      state.sim.limit = action.limit;
      state.sim.category = action.category;
      state.sim.countPage = action.countPage;
      state.sim.currentPage = action.currentPage;
      state.sim.countProducts = action.countProducts;
      state.sim.payload[`page-${action.currentPage}`] = action.payload;
      return state;

    case "Máy giặt":
      state.maygiat.isFetch = true;
      state.maygiat.limit = action.limit;
      state.maygiat.category = action.category;
      state.maygiat.countPage = action.countPage;
      state.maygiat.currentPage = action.currentPage;
      state.maygiat.countProducts = action.countProducts;
      state.maygiat.payload[`page-${action.currentPage}`] = action.payload;
      return state;

    case "Tivi":
      state.tivi.isFetch = true;
      state.tivi.limit = action.limit;
      state.tivi.category = action.category;
      state.tivi.countPage = action.countPage;
      state.tivi.currentPage = action.currentPage;
      state.tivi.countProducts = action.countProducts;
      state.tivi.payload[`page-${action.currentPage}`] = action.payload;
      return state;

    case "Tủ lạnh":
      state.tulanh.isFetch = true;
      state.tulanh.limit = action.limit;
      state.tulanh.category = action.category;
      state.tulanh.countPage = action.countPage;
      state.tulanh.currentPage = action.currentPage;
      state.tulanh.countProducts = action.countProducts;
      state.tulanh.payload[`page-${action.currentPage}`] = action.payload;
      return state;

    case "Loa":
      state.loa.isFetch = true;
      state.loa.limit = action.limit;
      state.loa.category = action.category;
      state.loa.countPage = action.countPage;
      state.loa.currentPage = action.currentPage;
      state.loa.countProducts = action.countProducts;
      state.loa.payload[`page-${action.currentPage}`] = action.payload;
      return state;

    case "Quạt điều hòa":
      state.quatdieuhoa.isFetch = true;
      state.quatdieuhoa.limit = action.limit;
      state.quatdieuhoa.category = action.category;
      state.quatdieuhoa.countPage = action.countPage;
      state.quatdieuhoa.currentPage = action.currentPage;
      state.dienthoai.limit = action.limit;
      state.quatdieuhoa.countProducts = action.countProducts;
      state.quatdieuhoa.payload[`page-${action.currentPage}`] = action.payload;
      return state;

    default:
      return state;
  }
};

export const selectorProducts = (state) => state.Products;
