import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import Header from "./Header";
import Collections from "./Collections";
import Collection from "./Collection"
import Clothes from "./Clothes";
import Grid from "@material-ui/core/Grid";
import Footer from "./Footer";
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
                        <Route path={"/clothes"} component={Clothes}/>
                    </Switch>
                </Router>
                <Footer/>
            </Grid>
        )
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);