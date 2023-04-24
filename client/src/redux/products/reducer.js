const INIT = {
  dienthoai: {
    isFetch: false,
    products: null,
  },
  tablet: {
    isFetch: false,
    products: null,
  },
  laptop: {
    isFetch: false,
    products: null,
  },
  tainghe: {
    isFetch: false,
    products: null,
  },
  dongho: {
    isFetch: false,
    products: null,
  },
  pc: {
    isFetch: false,
    products: null,
  },
  sim: {
    isFetch: false,
    products: null,
  },
  maygiat: {
    isFetch: false,
    products: null,
  },
  tivi: {
    isFetch: false,
    products: null,
  },
  tulanh: {
    isFetch: false,
    products: null,
  },
  loa: {
    isFetch: false,
    products: null,
  },
  quatdieuhoa: {
    isFetch: false,
    products: null,
  },
};

export const ProductsReducer = (state = INIT, action) => {
  switch (action.type) {
    case "Điện thoại":
      state.dienthoai.isFetch = true;
      state.dienthoai.products = action.payload;
      console.log("state", state);
      return state;

    case "Tablet":
      state.tablet.isFetch = true;
      state.tablet.products = action.payload;
      return state;

    case "Laptop":
      state.laptop.isFetch = true;
      state.laptop.products = action.payload;
      return state;

    case "Tai nghe":
      state.tainghe.isFetch = true;
      state.tainghe.products = action.payload;
      return state;

    case "Đồng hồ":
      state.dongho.isFetch = true;
      state.dongho.products = action.payload;
      return state;

    case "Pc":
      state.pc.isFetch = true;
      state.pc.products = action.payload;
      return state;

    case "Sim":
      state.sim.isFetch = true;
      state.sim.products = action.payload;
      return state;

    case "Máy giặt":
      state.maygiat.isFetch = true;
      state.maygiat.products = action.payload;
      return state;

    case "Tivi":
      state.tivi.isFetch = true;
      state.tivi.products = action.payload;
      return state;

    case "Tủ lạnh":
      state.tulanh.isFetch = true;
      state.tulanh.products = action.payload;
      return state;

    case "Loa":
      state.loa.isFetch = true;
      state.loa.products = action.payload;
      return state;

    case "Quạt điều hòa":
      state.quatdieuhoa.isFetch = true;
      state.quatdieuhoa.products = action.payload;
      return state;

    default:
      return state;
  }
};

export const selectorProducts = (state) => state.Products;