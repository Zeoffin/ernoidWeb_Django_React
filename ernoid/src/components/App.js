import React, { Component } from "react";
import { render } from "react-dom";

import HomePage from "./HomePage";
import Collections from "./Collections";
import Collection from "./Collection"
import Clothes from "./Clothes";
import Checkout from "./Checkout"
import ShoppingCart from "./ShoppingCart";
import ItemSelection from "./ItemSelection";
import Footer from "./Footer";
import Header from "./Header";

import Grid from "@material-ui/core/Grid";
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid style={{overflowY: 'scroll'}}>
                <Header/>
                <Router>
                    <Switch>
                        <Route exact path={"/"} component={HomePage}/>
                        <Route path={"/all-collections"} component={Collections}/>
                        <Route path={"/collection/:collectionName"} component={Collection}/>
                        <Route path={"/clothes/:clothingType"} component={Clothes}/>
                        <Route path={"/shopping-cart"} component={ShoppingCart}/>
                        <Route path={"/item-selection/:itemId"} component={ItemSelection}/>
                        <Route path={"/checkout"} component={Checkout}/>
                    </Switch>
                </Router>
                <Footer/>
            </Grid>
        )
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);