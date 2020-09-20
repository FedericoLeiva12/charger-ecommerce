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
  DELETE_FROM_CART,
  GET_SELECTORS,
  GET_ORDERS,
  CREATE_USER,
  LOGIN,
  LOGOUT,
  CHECKOUT,
  SNACKBAR_CLEAR,
  GET_USER,
  GET_SEARCH,
  CLEAR_CART,
  RESET_PASSWORD,
  GET_ALL_USERS,
  DELETE_FROM_USERS,
  MAKE_USER_ADMIN,
  GET_REVIEWS,
  ADD_REVIEWS,
  DELETE_REVIEWS,
  GET_USER_REVIEWS
} from "../constants";

const url = "localhost:3001";
const errorNotification = "Oh no! Something has gone wrong. Try again!";

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
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
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
            message,
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
            errorNotification,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
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
            message,
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
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
            message,
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
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
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
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
            message,
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
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
            message,
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
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
            message,
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
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
            message,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
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
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
      });
  };
}

export function getSearch(searchKey) {
  return (dispatch) => {
    axios
      .post(`http://${url}/products/search/`, { search: searchKey })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: GET_SEARCH,
            products: res.data.products,
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
          });
        }
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
            message,
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
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
export function clearCart() {
  const cart = [];

  return (dispatch) => {
    dispatch({
      type: CLEAR_CART,
      cart: cart,
    });
  };
}
export function addToCart(product, message) {
  return (dispatch) => {
    dispatch({
      type: ADD_TO_CART,
      cart: product,
      message,
    });
  };
}
export function removeFromCart(product, message) {
  return (dispatch) => {
    dispatch({
      type: REMOVE_FROM_CART,
      id: product.id,
      message,
    });
  };
}
export function deleteFromCart(product) {
  return (dispatch) => {
    dispatch({
      type: DELETE_FROM_CART,
      id: product.id,
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
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
      });
  };
}

export function getOrders(userId) {
  return (dispatch) => {
    axios
      .get(`http://${url}/order/${userId}`)
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          // console.log(res.data.orders);
          res.data.orders = res.data.orders.map((order) => ({
            ...order,
            shoppingCart: {
              ...order.shoppingCart,
              content: JSON.parse(order.shoppingCart.content),
            },
          }));
          dispatch({
            type: GET_ORDERS,
            orders: res.data.orders,
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
          });
        }
      })
      .catch(console.error);
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
            message,
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
      });
  };
}

export function loginUser(email, password) {
  return (dispatch) => {
    axios
      .post(
        `http://${url}/users/login`,
        { email, password },
        { withCredentials: true }
      )
      .then((res) => {
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
      })
      .catch(console.error);
  };
}

export function checkout() {
  const content = localStorage.getItem("cart");

  return (dispatch) => {
    axios
      .post(
        `http://${url}/checkout`,
        {
          content,
        },
        { withCredentials: true }
      )
      .then((res) => {
        const order = res.data.order;
        if (order) {
          dispatch({
            type: CHECKOUT,
            order: order,
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
      });
  };
}

export function logout() {
  return (dispatch) => {
    axios
      .get(`http://${url}/users/logout`, { withCredentials: true })
      .then((res) => {
        dispatch({
          type: LOGOUT,
          logged: false,
          user: null,
        });
      });
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
      })
      .catch(console.error);
  };
}

export function getAllUsers() {
  return (dispatch) => {
    axios
      .get(`http://${url}/users`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          dispatch({
            type: GET_ALL_USERS,
            users: res.data,
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
      });
  };
}

export function deleteUser(id, message) {
  return (dispatch) => {
    axios
      .delete(`http://${url}/users/${id}`)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: DELETE_FROM_USERS,
            id,
            message,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
      });
  };
}

export function makeAdmin(id, message) {
  return (dispatch) => {
    axios
      .put(`http://${url}/users/usertoadmin/${id}`)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: MAKE_USER_ADMIN,
            message,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
      });
  };
}

export const clearSnackbar = () => {
  return { type: SNACKBAR_CLEAR };
};

export const resetPassword = (email, password, repassword) => {
  return (dispatch) => {
    axios
      .put(`http://${url}/users/password/${email}`, { password, repassword })
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          return dispatch({
            type: RESET_PASSWORD,
            message: "Password changed correctly",
          });
        } else {
          return dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: ERROR_MESSAGE,
          message: err.data,
        });
      });
  };
};
//  w

export function getReviews(Id) {
  return (dispatch) => {
    axios
      .get(`http://${url}/reviews/${Id}`)
      .then((res) => {
        dispatch({
          type: GET_REVIEWS,
          reviews: res.data.reviews,
        });
      })
      .catch(console.error);
  };
}

export function addReviews(userId,productId,commentary, rating, message) {
  return (dispatch) => {
    axios
      .post(`http://${url}/reviews/`, { 
	userId, productId, commentary, rating 
      }).then((res) => {
          dispatch({
            type: ADD_REVIEWS,
            review: res.data.review,
            message
          });
      }).catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
      });
  };
}
export function deleteReviews(reviewId, message){
  return (dispatch) => {
    axios.delete(`http://${url}/reviews/${reviewId}`)
      .then((res) => {
          dispatch({
            type: DELETE_REVIEWS,
            id: reviewId,
            message
          });
<<<<<<< HEAD
      }).catch(console.error);
=======
      }).catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
      });

>>>>>>> 49056608bb06fdd56bca24625aa8a2f7f77792a9

  };
}

export function getUserReviews(userId) {
  return (dispatch) => {
    axios.get(`http://${url}/reviews/user/${userId}`)
      .then(res => {
        console.log(res.data.text)
        dispatch({
          type: GET_USER_REVIEWS,
          userReviews: res.data
        })
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
      });
  }
}
// en este caso, vamos a llevarnos esta funcion |
