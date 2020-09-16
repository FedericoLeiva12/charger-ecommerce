import {
  GET_CATEGORIES,
  GET_PRODUCTS,
  ERROR_MESSAGE,
  ADD_CATEGORY,
  MODIFY_CATEGORY,
  DELETE_CATEGORY,
  ADD_PRODUCT,
  DELETE_PRODUCTS,
  ADD_CATEGORY_PRODUCT,
  REMOVE_CATEGORY_PRODUCT,
  GET_PRODUCTS_BY_CATEGORY,
  MODIFY_PRODUCT,
  GET_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  GET_SELECTORS,
  CREATE_USER,
  LOGIN,
  CHECK_LOGIN,
  LOGOUT,
  CHECKOUT,
  SNACKBAR_CLEAR
} from "../constants";

import { loadState, saveState } from "../../localStorage";

const initialState = {
  categories: [],
  products: [],
  cart: loadState() === undefined ? [] : loadState(),
  selectors: [],
  users: [],
  logged: false,
  user: null,
  orders: [],

  error: false,
  errorMessage: "",

  successSnackbarOpen: false,
  errorSnackbarOpen: false,
  warningSnackbarOpen: false,
  successSnackbarMessage: '',
  errorSnackbarMessage: 'Oh no! Something has gone wrong. Try again!'
};

export default function Provider(state = initialState, action) {
  switch (action.type) {
    case '@@INIT':
      return {
        ...state
      }
    case GET_CATEGORIES:
      return { ...state, categories: action.categories };
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.category],
        successSnackbarOpen: true,
        successSnackbarMessage: action.message
      };
    case MODIFY_CATEGORY:
      let cat = state.categories.filter(
        (cat) => cat.id === parseInt(action.id)
      )[0];
      if (cat === undefined) return { ...state };
      let index = state.categories.indexOf(cat);
      let categories = [...state.categories];
      categories[index].name = action.name;
      categories[index].description = action.description;
      return {
        ...state,
        categories, //: state.categories.map(cat => cat.id === parseInt(action.id)?{...cat, name: action.name, description: action.description}:cat)
        successSnackbarOpen: true,
        successSnackbarMessage: action.message
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          (cat) => cat.id !== parseInt(action.id)
        ),
        successSnackbarOpen: true,
        successSnackbarMessage: action.message
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.products,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.product],
        successSnackbarOpen: true,
        successSnackbarMessage: action.message
      };
    case DELETE_PRODUCTS:
      return {
        ...state,
        products: state.products.filter(
          (prod) => prod.id !== parseInt(action.id)
        ),
        successSnackbarOpen: true,
        successSnackbarMessage: action.message
      };
    case ADD_CATEGORY_PRODUCT:
      return {
        ...state,
        successSnackbarOpen: true,
        successSnackbarMessage: action.message
      };
    case REMOVE_CATEGORY_PRODUCT:
      return {
        ...state,
        successSnackbarOpen: true,
        successSnackbarMessage: action.message
      };
    case GET_PRODUCTS_BY_CATEGORY:
      return {
        ...state,
        products: action.products,
      };
    case MODIFY_PRODUCT:
      let prod = state.products.filter(
        (prod) => prod.id === action.product.id
      )[0];
      if (prod === undefined) return { ...state };
      let indexProd = state.products.indexOf(prod);
      let products = [...state.products];
      products[indexProd].name = action.product.name;
      products[indexProd].description = action.product.description;
      products[indexProd].price = action.product.price;
      products[indexProd].stock = action.product.stock;
      products[indexProd].img = action.product.img;
      return {
        ...state,
        products,
        successSnackbarOpen: true,
        successSnackbarMessage: action.message
      };
    case GET_CART:
      return {
        ...state,
        cart: action.cart,
      };
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.cart],
        successSnackbarOpen: true,
        successSnackbarMessage: action.message
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((prod) => prod.id !== Number(action.id)),
        successSnackbarOpen: true,
        successSnackbarMessage: action.message
      };
    case GET_SELECTORS:
      return {
        ...state,
        selectors: action.selectors,
      };
    case CREATE_USER:
      return {
        ...state,
        users: [...state.users, action.createdUser],
        successSnackbarOpen: true,
        successSnackbarMessage: action.message
      };
    case LOGIN:
      return {
        ...state,
        logged: action.logged,
        user: action.user || null,
      };
    case LOGOUT:
      return {
        ...state,
        logged: action.logged,
        user: action.user || null,
      };
    case CHECK_LOGIN:
      return {
        ...state,
        logged: action.logged,
        user: action.user || null,
      };
    case CHECKOUT:
      return {
        ...state,
        orders: [...state.orders, action.order]
      }
    case ERROR_MESSAGE:
      return { ...state, error: true, errorMessage: action.message };
    case SNACKBAR_CLEAR:
      return {
        ...state,
        successSnackbarOpen: false,
        errorSnackbarOpen: false,
        warningSnackbarOpen: false
      }
    default:
      return { ...state };
  }
}
