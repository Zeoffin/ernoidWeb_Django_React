import * as actionTypes from './shopping-types'

export const addToCart = (item) => {
    return {
        type: actionTypes.ADD_TO_CART,
        payload: {
            item: item
        }
    }
}

export const removeFromCart = (item) => {
    return {
        type: actionTypes.REMOVE_FROM_CART,
        payload: {
            item: item
        }
    }
}

export const adjustQuantity = (item, value) => {
    return {
        type: actionTypes.ADJUST_QUANTITY,
        payload: {
            item: item,
            qty: value
        }
    }
}
