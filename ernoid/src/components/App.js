import React, { Component } from "react";
import { render } from "react-dom";
import {Provider} from "react-redux";
import store from "../redux/store";

import HomePage from "./HomePage";
import Collections from "./Collections";
import Collection from "./Collection"
import Clothes from "./Clothes";
import ShoppingCart from "./ShoppingCart";
import ItemSelection from "./ItemSelection";
import OrderSuccess from "./OrderSuccess";
import OrderCancel from "./OrderCancel";
import Footer from "./Footer";
import Header from "./Header";

import Grid from "@material-ui/core/Grid";
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    addItem (newItem) {
        this.setState({
            itemsInCart: [...this.state.itemsInCart, newItem]
        })
    }

    render() {
        return (
            <Grid style={{overflowY: 'scroll'}}>
                <Router>
                    <Header/>
                    <Switch>
                        <Route exact path={"/"} component={HomePage}/>
                        <Route path={"/all-collections"} component={Collections}/>
                        <Route path={"/collection/:collectionName"} component={Collection}/>
                        <Route path={"/clothes/:clothingType"} component={Clothes}/>
                        <Route path={"/shopping-cart"} component={ShoppingCart}/>
                        <Route path={"/item-selection/:itemId"} component={ItemSelection}/>
                        <Route path={"/order-success"} component={OrderSuccess}/>
                        <Route path={"/order-cancel"} component={OrderCancel}/>
                    </Switch>
                    <Footer/>
                </Router>
            </Grid>
        )
    }
}

const appDiv = document.getElementById("app");
const renderConst = <Provider store={store}><App/></Provider>;
render(renderConst, appDiv);