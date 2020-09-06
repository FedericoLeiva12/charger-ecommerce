import axios from 'axios';
import { GET_CATEGORIES, ADD_CATEGORY, ERROR_MESSAGE, MODIFY_CATEGORY, DELETE_CATEGORY, GET_PRODUCTS, DELETE_PRODUCTS, ADD_PRODUCT } from '../constants';

const url = 'localhost:3001';

export function getCategories() {
    return dispatch => {
        axios.get(`http://${url}/products/category`)
            .then(res => {
                if(res.status === 200) {
                    dispatch({
                        type: GET_CATEGORIES,
                        categories: res.data || []
                    });
                } else {
                    dispatch({
                        type: ERROR_MESSAGE,
                        categories: res.data.text
                    })
                }
            }).catch(console.error)
    }
}

export function addCategory(name) {
    return dispatch => {
        axios.post(`http://${url}/products/category`, {
            name
        }).then(res => {
            if(res.status === 200) {
                dispatch({
                    type: ADD_CATEGORY,
                    category: res.data.category
                })
            } else {
                dispatch({
                    type: ERROR_MESSAGE,
                    message: res.data.text
                });
            }
        }).catch(console.error)
    }
}

export function modifyCategory(id, name) {
    return dispatch => {
        axios.put(`http://${url}/products/category/${id}`, {
            name
        }).then(res => {
            if(res.status == 200) {
                dispatch({
                    type: MODIFY_CATEGORY,
                    id,
                    name
                })
            } else {
                dispatch({
                    type: ERROR_MESSAGE,
                    message: res.data.text
                });
            }
        }).catch(console.error)
    }
}

export function deleteCategory(id) {
    return dispatch => {
        axios.delete(`http://${url}/products/category/${id}`)
            .then(res => {
                if(res.status===200) {
                    dispatch({
                        type: DELETE_CATEGORY,
                        id
                    });
                } else {
                    dispatch({
                        type: ERROR_MESSAGE,
                        message: res.data.text
                    })
                }
            }).catch(console.error)
    }
}

export function getProducts() {
    return dispatch => {
        axios.get(`http://${url}/products`)
            .then(res => {
                if(res.status === 200) {
                    dispatch({
                        type: GET_PRODUCTS,
                        products: res.data
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

export function deleteProduct(id) {
    return dispatch => {
        axios.delete(`http://${url}/products/${id}`)
            .then(res => {
                if(res.status === 200) {
                    dispatch({
                        type: DELETE_PRODUCTS,
                        id
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

export function addProduct(name, price, stock, img) {
    return dispatch => {
        axios.post(`http://${url}/products`, {
            name, price, stock, img
        }).then(res => {
            if(res.status === 200) {
                dispatch({
                    type: ADD_PRODUCT,
                    product: res.data.product
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