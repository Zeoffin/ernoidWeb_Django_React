import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import Header from "./Header";
import Grid from "@material-ui/core/Grid";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid>
                <Header/>
                <HomePage/>
            </Grid>
        )
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);