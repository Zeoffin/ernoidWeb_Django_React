import * as actionTypes from './shopping-types';

const INITIAL_STATE = {
    cart: [],         // id, price, type, colour, quantity field
    itemsInCart: 0
}

const shopReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case actionTypes.ADD_TO_CART:
            /**
             * ADD TO CART - adds a new item to the cart. Increments the quantity (count) of the item if the item_id
             * and size is the same.
             */
            const itemInCart = state.cart.find((item) => item.item.item_id === action.payload.item.item_id && item.item.size === action.payload.item.size);
            return {...state,
                itemsInCart: itemInCart ? state.itemsInCart : state.itemsInCart + 1,
                cart: itemInCart ?
                    state.cart.map(item =>
                        item.item.item_id === action.payload.item.item_id && item.item.size === action.payload.item.size ?
                            {...item, count: item.count + 1} : item)
                    : [...state.cart, {...action.payload, count: 1}]
            };

        case actionTypes.REMOVE_FROM_CART:
            /**
             * REMOVE FROM CART - removes given item from the shopping cart
             */
            return {...state,
                itemsInCart: state.itemsInCart - 1,
                cart: state.cart.filter((item) => (item.item.item_id !== action.payload.item.item_id || item.item.size !== action.payload.item.size))
            };

        case actionTypes.ADJUST_QUANTITY:
            return {...state,
                cart: state.cart.map(item =>
                    item.item.item_id === action.payload.item.item_id  && item.item.size === action.payload.item.size ?
                        {...item, count: +action.payload.count} :
                        item)
            };

        default:
            return state
    }
};

export default shopReducer;
