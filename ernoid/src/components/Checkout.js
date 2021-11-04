import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";

export default class Checkout extends Component {
    constructor(props) {
        super(props);
    }


    render() {

        return (
            <section>
                <div className="product">
                    <img
                    src="https://i.imgur.com/EHyR2nP.png"
                    alt="The cover of Stubborn Attachments"
                    />
                    <div className="description">
                        <h3>Stubborn Attachments</h3>
                        <h5>$20.00</h5>
                    </div>
                </div>
                <form action="/create-checkout-session" method="POST">
                    <button type="submit">
                    Checkout
                    </button>
                </form>
            </section>
        );
    }
}