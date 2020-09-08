import axios from 'axios';
import { GET_CATEGORIES, ADD_CATEGORY, ERROR_MESSAGE, MODIFY_CATEGORY, DELETE_CATEGORY, GET_PRODUCTS, DELETE_PRODUCTS, ADD_PRODUCT, ADD_CATEGORY_PRODUCT, REMOVE_CATEGORY_PRODUCT } from '../constants';

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

export function addCategory(name, description) {
    return dispatch => {
        axios.post(`http://${url}/products/category`, {
            name, description
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

export function modifyCategory(id, name, description) {
    return dispatch => {
        axios.put(`http://${url}/products/category/${id}`, {
            name, description
        }).then(res => {
            if(res.status === 200) {
                dispatch({
                    type: MODIFY_CATEGORY,
                    id,
                    name, description
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

export function addProduct(name, description, price, stock, img) {
    return dispatch => {
        axios.post(`http://${url}/products`, {
            name, description, price, stock, img
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

export function addCategoryProduct (productId, categoryId) {
    return dispatch => {
        console.log({productId, categoryId})
        axios.put(`http://${url}/products/${productId}/${categoryId}`)
            .then(res => {
                if(res.status === 200) {
                    dispatch({
                        type: ADD_CATEGORY_PRODUCT,
                        data: {
                            productId,
                            categoryId
                        }
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

export function removeCategoryProduct (productId, categoryId) {
    return dispatch => {
        axios.put(`http://${url}/products/${productId}/${categoryId}`)
            .then(res => {
                if(res.status === 200) {
                    dispatch({
                        type: REMOVE_CATEGORY_PRODUCT,
                        data: {
                            productId,
                            categoryId
                        }
                    })
                }
            })
    }
}

export function modifyProduct(id, name, price, stock, idCategory){
    return (dispatch)=>{
        axios.put(`http://${url}/products/${id}`, {
            name
        }).then(res => {
            if(res.status === 200) {
                dispatch({
                    type: MODIFY_PRODUCT,
                    name,
                    description,
                    price,
                    stock,
                    img
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
