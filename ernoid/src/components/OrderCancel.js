import React, { Component, useEffect } from 'react';
import Grid from "@material-ui/core/Grid";
import { Link } from 'react-router-dom';

export default class OrderCancel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div>
            <p>Order canceled!</p>
        </div>
        )
    }

}