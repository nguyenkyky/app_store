import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

const initialState = {
  cart: [
    {
      id: 1,
      name: "product 1",
      image:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7ed0855435194229a525aad6009a0497_9366/Giay_Superstar_trang_EG4958_01_standard.jpg",
      price: 1000,
      quantity: 10,
    },
  ],
  dataProduct: [
    {
      id: 1,
      name: "Adidas Prophere",
      alias: "adidas-prophere",
      price: 350,
      description:
        "The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n",
      size: "[36,37,38,39,40,41,42]",
      shortDescription:
        "The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n",
      quantity: 995,
      deleted: false,
      categories:
        '[{"id":"ADIDAS","category":"ADIDAS"},{"id":"MEN","category":"MEN"},{"id":"WOMEN","category":"WOMEN"}]',
      relatedProducts: "[2,3,5]",
      feature: true,
      image: "https://shop.cyberlearn.vn/images/adidas-prophere.png",
    },
  ],
};

const shopReducer = createSlice({
  name: "shopReducer",
  initialState,
  reducers: {
    getProductApiAction: (state, action) => {
      console.log(action);
      state.dataProduct = action.payload;
    },
    addToCartAction: (state, action) => {
      console.log(action);
      const itemCart = state.cart.find((item) => item.id === action.payload.id);
      if (itemCart) {
        itemCart.quantity += 1;
      } else {
        state.cart.push(action.payload);
      }
    },
    deleteItemAction: (state, action) => {
      let id = action.payload;
      state.cart = state.cart.filter((item) => item.id !== id);
    },
    changeQuantityAction: (state, action) => {
      const { id, quantity } = action.payload;
      const itemCart = state.cart.find((item) => item.id === id);
      if (itemCart) {
        itemCart.quantity += quantity;
        if (itemCart.quantity < 1) {
          if (window.confirm("Bạn có muốn xóa sản phẩm ?")) {
            state.cart = state.cart.filter((item) => item.id !== id);
          } else {
            itemCart.quantity -= quantity;
          }
        }
      }
    },
  },
});

export const {
  getProductApiAction,
  addToCartAction,
  deleteItemAction,
  changeQuantityAction,
} = shopReducer.actions;
export default shopReducer.reducer;

//---------------Action thunk -------------

export const getAllProductApi = () => {
  return async (dispatch, getState) => {
    try {
      const result = await axios({
        url: "https://shop.cyberlearn.vn/api/Product",
        method: "GET",
      });

      const action = getProductApiAction(result.data.content);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};
