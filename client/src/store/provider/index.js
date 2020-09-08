import { GET_CATEGORIES, GET_PRODUCTS, ERROR_MESSAGE, ADD_CATEGORY, MODIFY_CATEGORY, DELETE_CATEGORY, ADD_PRODUCT, DELETE_PRODUCTS, ADD_CATEGORY_PRODUCT, REMOVE_CATEGORY_PRODUCT } from '../constants';

const initialState = {
    categories: [],
    products: [],
    error: false,
    errorMessage: ''
};

export default function Provider(state = initialState, action) {
    switch(action.type) {
        case GET_CATEGORIES:
            return {...state,
                categories: action.categories
            }
        case ADD_CATEGORY:
            return {
                ...state,
                categories: [...state.categories, action.category]
            }
        case MODIFY_CATEGORY:
            let cat = state.categories.filter(cat => cat.id === parseInt(action.id))[0];
            if(cat === undefined) return {...state};
            let index = state.categories.indexOf(cat);
            let categories = [...state.categories];
            categories[index].name = action.name;
            categories[index].description = action.description;
            return {
                ...state,
                categories//: state.categories.map(cat => cat.id === parseInt(action.id)?{...cat, name: action.name, description: action.description}:cat)
            }
        case DELETE_CATEGORY:
            return {
                ...state,
                categories: state.categories.filter(cat => cat.id !== parseInt(action.id))
            };
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.products
            }
        case ADD_PRODUCT:
            return {
                ...state,
                products: [...state.products, action.product]
            }
        case DELETE_PRODUCTS:
            return {
                ...state,
                products: state.products.filter(prod => prod.id !== parseInt(action.id))
            }
        case ADD_CATEGORY_PRODUCT:
            return {
                ...state
            }
        case REMOVE_CATEGORY_PRODUCT:
            return {
                ...state
            }
        case MODIFY_PRODUCT:
            let prod = state.products.filter(prod => prod.id === action.id)[0];
            if(prod === undefined) return {...state};
            let index = state.products.indexOf(prod);
            let products = [...state.products];
            products[index].name = action.name;
            return {
                ...state,
                products
            }
        case ERROR_MESSAGE:
            return {...state,
                error: true,
                errorMessage: action.message
            }
        default:
            return { ...state };
    }
}
