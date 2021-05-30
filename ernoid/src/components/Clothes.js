import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";

export default class Clothes extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Grid>
                <div className={"clothes-main"}>
                    <p>Clothes page</p>
                </div>
            </Grid>
        );
    }
}