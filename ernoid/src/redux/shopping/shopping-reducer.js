import * as actionTypes from './shopping-types';

const INITIAL_STATE = {
    cart: [],         // id, price, type, colour, quantity field
    itemsInCart: 0
}

const shopReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            return {...state,
                itemsInCart: state.itemsInCart + 1,
                cart: [...state.cart, action.payload]
            };
        case actionTypes.REMOVE_FROM_CART:
            return {};
        case actionTypes.ADJUST_QUANTITY:
            return {};
        default:
            return state
    }
};

export default shopReducer;
