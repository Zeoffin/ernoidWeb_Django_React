import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";

export default class Collection extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.collectionName = this.props.match.params.collectionName;
    }

    render() {
        return (
            <div>
                <h3>{this.collectionName}</h3>
                <p>Jow!</p>
            </div>
        )
    }

}