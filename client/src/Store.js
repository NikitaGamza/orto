import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  cart: {
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
  },

  product: {
    loading: false,
    list: null,
    error: null,
    isVisibleEditModal: false,
    editProductId: null,
    removeProductId: null,
    isUpdateList: true,
  },
};

export const ActionTypes = {
  CART_ADD_ITEM: 'CART_ADD_ITEM',
  UPDATE_LIST_START: 'UPDATE_LIST_START',
  UPDATE_LIST_FINISH: 'UPDATE_LIST_FINISH',
};

function reducer(state, action) {
  switch (action.type) {
    case ActionTypes.CART_ADD_ITEM:
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    //add to cart
    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'USER_SIGNIN':
      return { ...state, userInfo: action.payload };
    case 'USER_SIGNOUT':
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          shippingAddress: {},
        },
      };
    case 'SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
      };

    case 'FETCH_PRODUCT_REQUEST':
      return { ...state, product: { ...state.product, loading: true } };

    case 'FETCH_PRODUCT_SUCCESS':
      const products = action.payload;
      return {
        ...state,
        product: { ...state.product, list: products, loading: false },
      };

    case 'FETCH_PRODUCT_FAIL':
      return {
        ...state,
        product: { ...state.product, list: null, loading: false },
      };

    case 'TOGGLE_EDIT_MODAL':
      return {
        ...state,
        product: {
          ...state.product,
          isVisibleEditModal: action.payload,
        },
      };

    case 'SET_EDIT_PRODUCT_ID':
      return {
        ...state,
        product: {
          ...state.product,
          editProductId: action.payload,
        },
      };

    case 'SET_REMOVE_PRODUCT_ID':
      return {
        ...state,
        product: {
          ...state.product,
          removeProductId: action.payload,
        },
      };

    case ActionTypes.UPDATE_LIST_START:
      return {
        ...state,
        product: {
          ...state.product,
          isUpdateList: true,
        },
      };

    case ActionTypes.UPDATE_LIST_FINISH:
      return {
        ...state,
        product: {
          ...state.product,
          isUpdateList: false,
        },
      };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
// 1. создается компонент
// загрузки нет
// 2. запрос на сервер
// 3. получение ответа
