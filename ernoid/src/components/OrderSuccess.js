import React, { Component, useEffect } from 'react';
import Grid from "@material-ui/core/Grid";
import { Link } from 'react-router-dom';

export default class OrderSuccess extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div className={"collection-main"}>
            <b className={"collection-text"}>Your order is being processed!</b>
            <p className={"order-success-subtext"}>Your order is currently being processed. Please check your email for details!</p>
        </div>
        )
    }

}