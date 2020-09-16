import axios from "axios";
import encrypt from "../../utils";

import { loadState, saveState } from "../../localStorage";
import {
  GET_CATEGORIES,
  ADD_CATEGORY,
  ERROR_MESSAGE,
  MODIFY_CATEGORY,
  DELETE_CATEGORY,
  GET_PRODUCTS,
  DELETE_PRODUCTS,
  ADD_PRODUCT,
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
  LOGOUT,
  CHECKOUT,
  SNACKBAR_CLEAR
  GET_USER,
} from "../constants";

const url = "localhost:3001";
const errorNotification = 'Oh no! Something has gone wrong. Try again!'

export function getCategories() {
  return (dispatch) => {
    axios
      .get(`http://${url}/products/category`)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: GET_CATEGORIES,
            categories: res.data || [],
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            categories: res.data.text,
          });
        }
      })
      .catch(err => {
        console.error(err)
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification
        })
      });
  };
}

export function addCategory(name, description, message) {
  return (dispatch) => {
    axios
      .post(`http://${url}/products/category`, {
        name,
        description,
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: ADD_CATEGORY,
            category: res.data.category,
            message
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
            errorNotification
          });
        }
      })
      .catch(err => {
        console.error(err)
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification
        })
      });
  };
}

export function modifyCategory(id, name, description, message) {
  return (dispatch) => {
    axios
      .put(`http://${url}/products/category/${id}`, {
        name,
        description,
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: MODIFY_CATEGORY,
            id,
            name,
            description,
            message
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
          });
        }
      })
      .catch(err => {
        console.error(err)
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification
        })
      });
  };
}

export function deleteCategory(id, message) {
  return (dispatch) => {
    axios
      .delete(`http://${url}/products/category/${id}`)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: DELETE_CATEGORY,
            id,
            message
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
          });
        }
      })
      .catch(err => {
        console.error(err)
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification
        })
      });
  };
}

export function getProducts() {
  return (dispatch) => {
    axios
      .get(`http://${url}/products?showOutStock=true`)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: GET_PRODUCTS,
            products: res.data,
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
          });
        }
      })
      .catch(err => {
        console.error(err)
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification
        })
      });
  };
}

export function deleteProduct(id, message) {
  return (dispatch) => {
    axios
      .delete(`http://${url}/products/${id}`)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: DELETE_PRODUCTS,
            id,
            message
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
          });
        }
      })
      .catch(err => {
        console.error(err)
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification
        })
      });
  };
}

export function addProduct(name, description, price, stock, img, message) {
  return (dispatch) => {
    axios
      .post(`http://${url}/products`, {
        name,
        description,
        price,
        stock,
        img,
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: ADD_PRODUCT,
            product: res.data.product,
            message
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
          });
        }
      })
      .catch(err => {
        console.error(err)
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification
        })
      });
  };
}

export function addCategoryProduct(productId, categoryId, message) {
  return (dispatch) => {
    console.log({ productId, categoryId });
    axios
      .put(`http://${url}/products/${productId}/${categoryId}`)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: ADD_CATEGORY_PRODUCT,
            data: {
              productId,
              categoryId,
            },
            message
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
          });
        }
      })
      .catch(err => {
        console.error(err)
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification
        })
      });
  };
}

export function removeCategoryProduct(productId, categoryId, message) {
  return (dispatch) => {
    axios
      .delete(`http://${url}/products/${productId}/${categoryId}`)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: REMOVE_CATEGORY_PRODUCT,
            data: {
              productId,
              categoryId,
            },
            message
          });
        }
      })
      .catch(err => {
        console.error(err)
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification
        })
      });
  };
}

export function getProductsByCategory(categoryId) {
  return (dispatch) => {
    axios
      .get(`http://${url}/products/searchByCategory/${categoryId}`)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: GET_PRODUCTS_BY_CATEGORY,
            products: res.data.products,
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
          });
        }
      })
      .catch(err => {
        console.error(err)
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification
        })
      });
  };
}

export function modifyProduct(
  id,
  name,
  description,
  price,
  stock,
  img,
  message
) {
  return (dispatch) => {
    axios
      .put(`http://${url}/products/${id}`, {
        name,
        price,
        stock,
        description,
        img,
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: MODIFY_PRODUCT,
            product: res.data.product,
            message
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
          });
        }
      })
      .catch(err => {
        console.error(err)
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification
        })
      });
  };
}
export function getCart() {
  return (dispatch) => {
    const cart = loadState();
    if (cart !== "error") {
      dispatch({
        type: GET_CART,
        cart: cart,
      });
    }
  };
}
export function addToCart(product, message) {
  return (dispatch) => {
    dispatch({
      type: ADD_TO_CART,
      cart: product,
      message
    });
  };
}
export function removeFromCart(product, message) {
  return (dispatch) => {
    dispatch({
      type: REMOVE_FROM_CART,
      id: product.id,
      message
    });
  };
}
export function getSelectors() {
  return (dispatch) => {
    axios
      .get(`http://${url}/products/selectors`)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: GET_SELECTORS,
            selectors: res.data.selectors,
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
          });
        }
      })
      .catch(err => {
        console.error(err)
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification
        })
      });
  };
}

export function createUser(email, password, name, lastName, address, message) {
  return (dispatch) => {
    axios
      .post(`http://${url}/users`, {
        email,
        password,
        name,
        lastName,
        address, //aca se los pasamos por body
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: CREATE_USER,
            createdUser: res.data.createdUser,
            message
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
          });
        }
      })
      .catch(err => {
        console.error(err)
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification
        })
      });
  };
}

export function loginUser(email, password) {
  return (dispatch) => {
    axios.post(`http://${url}/users/login`, { email, password }, { withCredentials: true }).then((res) => {
      console.log(res);
      if (res.data.logged === true) {
        dispatch({
          type: LOGIN,
          user: res.data.user,
          logged: res.data.logged,
        });
      } else {
        dispatch({
          type: ERROR_MESSAGE,
          message: res.data.text,
        });
      }
    }).catch(console.error);
  };
}

export function checkout() {
  const content = localStorage.getItem('cart');
  const sessionToken = localStorage.getItem('sessionToken');

  return dispatch => {
    axios.post(`http://${url}/checkout`, {
      content, sessionToken
    }).then(res => {
      const order = res.data.order;
      if(order) {
        dispatch({
          type: CHECKOUT,
          order: order
        })
      } else {
        dispatch({
          type: ERROR_MESSAGE,
          message: res.data.text
        })
      }
    }).catch(console.error)
  }
}

export function logout() {
  return (dispatch) => {
    axios.get(`http://${url}/users/logout`, { withCredentials: true })
      .then(res => {
        dispatch({
          type: LOGOUT,
          logged: false,
          user: null,
        });
      })
  };
}

export function getUser() {
  return (dispatch) => {
    axios
      .get(`http://${url}/users/getuser`, { withCredentials: true })
      .then((res) => {
        if (res.data.logged) {
          dispatch({
            type: GET_USER,
            logged: res.data.logged,
            user: res.data.user,
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
          });
        }
      }).catch(console.error);
  };
}

export const clearSnackbar = () => {
  return dispatch => {
    dispatch({ type: SNACKBAR_CLEAR });
  };
};
//  w
// en este caso, vamos a llevarnos esta funcion |
