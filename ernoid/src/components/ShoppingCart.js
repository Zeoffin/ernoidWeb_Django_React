import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import store from "../redux/store";
import {Link} from "react-router-dom";
import { ContinueToCheckoutButton } from "../customComponents";
import { removeFromCart, adjustQuantity } from "../redux/shopping/shopping-actions";

export default class ShoppingCart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: store.getState().shop.cart
        }
    }

    removeItem(item) {
        store.dispatch(removeFromCart(item));
        this.setState({
            items: store.getState().shop.cart
        })
    }

    changeItemCount(event, item) {
        store.dispatch(adjustQuantity(item, event.target.value))
        this.setState({
            items: store.getState().shop.cart
        })
    }

    getOrderValue() {
        let orderTotal = 0;
        this.state.items.forEach((item) => {
            let accessItem = item.item;
            orderTotal += accessItem.item.price * item.count;
        })
        return orderTotal.toFixed(2);
    }

    getOrderTotal() {
        // TODO: Delivery 10.00... hardcoded?
        let orderTotal = parseFloat(this.getOrderValue())+10;
        return orderTotal.toFixed(2);
    }

    formatOrderIds() {
        let returnLink = ""
        this.state.items.forEach((item) => {
            let accessItem = item.item;
            for(let i = 0; i < parseInt(item.count); i++) {
                returnLink += accessItem.item_id;
                returnLink += '/'
                returnLink += accessItem.size;
                returnLink += ','
            }
        });
        returnLink = returnLink.slice(0, -1);
        return returnLink
    }

    showCartItems() {
        let returnArray = [];
        this.state.items.forEach((item) => {
            let accessItem = item.item;
            returnArray.push(
                <div className={"collection-main-item"}>
                    <Grid container direction={"row"} alignItems="center">
                        <div>
                            <img className={"home-featured-preview-images"} src={accessItem.item.preview_image}/>
                        </div>
                        <div className={"cart-item-information"}>
                            <Grid container direction={"column"} className={"home-featured-preview-description"}>
                                <Grid container direction={"row"} alignItems={"center"}>
                                    <b className={"cart-item-title"}>{accessItem.item.collection}</b>
                                    <p className={"home-featured-preview-description-type"}>{accessItem.item.clothing_type}</p>
                                    <img className={"cart-item-trash-bin"} src={"/static/images/assets/trash_bin.png"} onClick={(e)=>this.removeItem(accessItem)}/>
                                </Grid>
                                <p className={"cart-item-top-info"}>{accessItem.item.price} $</p>
                                <div>
                                    <Grid container direction={"row"} alignItems={"center"}>
                                        <div>
                                            <Grid container direction={"column"}>
                                                <p className={"cart-item-no-margin-bot"}>Color: {accessItem.item.colour}</p>
                                                <p className={"cart-item-no-margin-bot"}>Size: {accessItem.size}</p>
                                            </Grid>
                                        </div>
                                        <input className={"cart-item-count"}
                                               type="number"
                                               id="quantity"
                                               name="quantity"
                                               value={item.count}
                                               onChange={(e) => this.changeItemCount(e, accessItem)}
                                               min="1" max="99"/>
                                    </Grid>
                                </div>
                            </Grid>
                        </div>
                    </Grid>
                </div>
            );
        });
        return returnArray
    }

    showPaymentAndCartItems() {
        let contentArray = []
        if (this.state.items.length > 0) {
            contentArray.push(
                <div>
                    <Grid container direction={"row"} justify="center">
                        <div>
                            {this.showCartItems()}
                        </div>
                        <div className={"cart-checkout-main"}>
                            <Grid container className={"cart-checkout-main-sticky"} direction={"column"}>
                                <div className={"cart-checkout-text"}>
                                    <Grid container direction={"row"}>
                                        <p className={"cart-checkout-left-text"}>Order value</p>
                                        <p className={"cart-checkout-right-text"}>{this.getOrderValue()}$</p>
                                    </Grid>
                                </div>
                                <div className={"cart-checkout-text"}>
                                    <Grid container direction={"row"}>
                                        <p className={"cart-checkout-left-text"}>Delivery</p>
                                        <p className={"cart-checkout-right-text"}>10.00$</p>
                                    </Grid>
                                </div>
                                <hr className={"cart-checkout-line"}/>
                                <div className={"cart-checkout-text"}>
                                    <Grid container direction={"row"}>
                                        <b className={"cart-checkout-left-text"}>Total</b>
                                        <b className={"cart-checkout-right-text"}>{this.getOrderTotal()}$</b>
                                    </Grid>
                                </div>

                                <form action="../api/create-checkout-session" method="POST">
                                    <ContinueToCheckoutButton type="submit" name="item_id" value={this.formatOrderIds()}>CONTINUE TO CHECKOUT</ContinueToCheckoutButton>
                                </form>

                                <p className={"cart-checkout-policy-accept"}>We accept:</p>
                                <img className={"cart-checkout-payments"} src={"/static/images/assets/payment_methods2.png"}/>
                                <p className={"cart-checkout-policy"}>
                                    Prices and delivery costs are not confirmed <br />
                                    until you’ve reached the checkout.
                                </p>
                                <p className={"cart-checkout-policy"}>
                                    30 day withdrawal. Read more about <br />
                                    return and refund policy.
                                </p>
                            </Grid>
                        </div>
                    </Grid>
                </div>
            )
        } else {
            contentArray.push(
                <div>
                    <h2 className={"cart-item-noitems"}>There are no items in the cart</h2>
                </div>
            )
        }
        return contentArray
    }

    render() {

        return (
            <div className={"collection-main"}>
                <b className={"collection-text"}>SHOPPING CART</b>
                {this.showPaymentAndCartItems()}
            </div>
        );
    }
}