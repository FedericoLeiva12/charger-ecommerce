import axios from 'axios';
import { GET_CATEGORIES } from '../constants';

const url = 'localhost:3001';

export function getCategories() {
    return dispatch => {
        axios.get(`http://${url}/products/category`)
            .then(categories => dispatch({
                type: GET_CATEGORIES,
                categories
            }))
    }
}