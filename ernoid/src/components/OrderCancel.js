import React, { Component, useEffect } from 'react';
import Grid from "@material-ui/core/Grid";
import { Link } from 'react-router-dom';

export default class OrderCancel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div className={"collection-main"}>
            <b className={"collection-text"}>Your order has been cancelled!</b>
            <p className={"collection-text"}>Feel free to browse around and checkout whenever you are ready!</p>
        </div>
        )
    }

}