import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";

export default class Collections extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Grid>
                <div className={"collections-main"}>
                    <p>Collections page</p>
                </div>
            </Grid>
        );
    }
}