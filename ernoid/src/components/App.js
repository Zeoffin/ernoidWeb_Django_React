import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import Header from "./Header";
import Collections from "./Collections";
import Clothes from "./Clothes";
import Grid from "@material-ui/core/Grid";
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid>
                <Header/>
                <Router>
                    <Switch>
                        <Route exact path={"/"} component={HomePage}/>
                        <Route path={"/collections"} component={Collections}/>
                        <Route path={"/clothes"} component={Clothes}/>
                    </Switch>
                </Router>
            </Grid>
        )
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);