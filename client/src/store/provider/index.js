import { GET_CATEGORIES, GET_PRODUCTS } from '../constants';

const initialState = {
    categories: [],
    products: []
};

export default function Provider(state = initialState, action) {
    switch(action.type) {
        case GET_CATEGORIES:
            return {...state,
                categories: action.categories
            }
        default:
            return { ...state };
    }
}