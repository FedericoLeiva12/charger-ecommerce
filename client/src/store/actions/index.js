import axios from 'axios';
import { GET_CATEGORIES, ADD_CATEGORY, ERROR_MESSAGE, MODIFY_CATEGORY, DELETE_CATEGORY } from '../constants';

const url = 'localhost:3001';

export function getCategories() {
    return dispatch => {
        axios.get(`http://${url}/products/category`)
            .then(categories => dispatch({
                type: GET_CATEGORIES,
                categories: categories.data || []
            })) 
    }
}

export function addCategory(name) {
    return dispatch => {
        axios.post(`http://${url}/products/category`, {
            data: {
                name
            }
        }).then(res => {
            if(res.status === 300) {
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
        })
    }
}

export function modifyCategory(id, name) {
    return dispatch => {
        axios.put(`http://${url}/products/category/${id}`, {
            data: {
                name
            }
        }).then(res => {
            if(res.status == 300) {
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
        }).catch(err => console.error(err))
    }
}

export function deleteCategory(id) {
    return dispatch => {
        axios.delete(`http://${url}/products/category/${id}`)
            .then(res => {
                if(res.status===300) {
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
            })
    }
}