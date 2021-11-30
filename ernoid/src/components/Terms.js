import React, { Component, useEffect } from 'react';
import Grid from "@material-ui/core/Grid";
import { Link } from 'react-router-dom';

export default class Terms extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div className={"collection-main"}>
            <b className={"collection-text"}>Terms & Conditions</b>
            <div className={"terms-text"}>

                <b>Overview</b>
                <p>
                ERNOID offers this website, including all information, tools and services available
                from this site to you, the user, conditioned upon your acceptance of all terms,
                conditions, policies and notices stated here.<br/>
                By visiting our site and / or purchasing something from us, you engage in our
                “Service” and agree to be bound by the following terms and conditions (“Terms of
                Service”, “Terms”). These Terms of Service apply to all users of the site, including
                without limitation users who are browsers, vendors, customers, merchants, and/
                or contributors of content.<br/>
                <br/>
                Please read these Terms of Service carefully before accessing or using our
                website. By accessing or using any part of the site, you agree to be bound by these
                Terms of Service. If you do not agree to all the terms and conditions of this
                agreement, then you may not access the website or use any services. If these
                Terms of Service are considered an offer, acceptance is expressly limited to these
                Terms of Service.<br/>
                <br/>
                Any new features or tools which are added to the current store shall also be
                subject to the Terms of Service. You can review the most current version of the
                Terms of Service at any time on this page. We reserve the right to update, change
                or replace any part of these Terms of Service by posting updates and/or changes
                to our website. It is your responsibility to check this page periodically for changes.
                Your continued use of or access to the website following the posting of any
                changes constitutes acceptance of those changes.<br/>
                <br/>
                Our store is hosted on Heroku They provide us with the online e-commerce
                platform that allows us to sell our products and services to you.
                </p>
                <hr/>

                <b>Online store terms</b>
                <p>
                By agreeing to these Terms of Service, you represent that you are at least the age
                of majority in your state or province of residence, or that you are the age of
                majority in your state or province of residence and you have given us your
                consent to allow any of your minor dependents to use this site.<br/>
                <br/>
                You may not use our products for any illegal or unauthorized purpose nor may
                you, in the use of the Service, violate any laws in your jurisdiction (including but
                not limited to copyright laws).<br/>
                <br/>
                You must not transmit any worms or viruses or any code of a destructive nature.<br/>
                <br/>
                A breach or violation of any of the Terms will result in an immediate termination
                of your Services.
                </p>
                <hr/>

                <b>General conditions</b>
                <p>
                We reserve the right to refuse service to anyone for any reason at any time.<br/>
                <br/>
                You understand that your content (not including credit card information), may be
                transferred unencrypted and involve (a) transmissions over various networks;
                and (b) changes to conform and adapt to technical requirements of connecting
                networks or devices. Credit card information is always encrypted during transfer
                over networks.<br/>
                <br/>
                You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of
                the Service, use of the Service, or access to the Service or any contact on the
                website through which the service is provided, without express written
                permission by us.<br/>
                <br/>
                The headings used in this agreement are included for convenience only and will
                not limit or otherwise affect these Terms.
                </p>
                <hr/>

                <b>Placing an order</b>
                <p>
                When you place an order, you should receive an acknowledgement e-mail
                confirming receipt of your order. We then carry out a standard pre-authorisation
                check to make sure there’s enough money on the card.<br/>
                <br/>
                We only accept your order once payment has been approved and we have debited
                the payment card (and then the contract is made based on these terms).<br/>
                <br/>
                You may be able to cancel (not change) your order within a short period of
                ordering – timings depend on your chosen delivery method (and will be set out in
                the acknowledgement email). You can’t change your order – you’ll need to cancel
                (and/or return original item(s)), and re-order.<br/>
                <br/>
                All orders are subject to availability and confirmation of the order price. Don’t
                worry, if there’s an issue with an order, we’ll get in touch with you.<br/>
                <br/>
                Very occasionally, we may need to refuse or cancel an order or close or freeze an
                account (even if we have previously confirmed your order) – e.g. if we notice
                something unusual on an order or an account or if your order goes against unit
                limits as detailed on the product display pages of specific products. If this
                happens to you and you think we’ve made a mistake, please don’t take offence.
                </p>
                <hr/>

                <b>Delivery</b>
                <p>
                After you finalise your order, Prinify will choose the delivery courier with
                estimated delivery time and dates depending on the delivery address.<br/>
                <br/>
                Sometimes there may be delays – e.g. because of postal/carrier delays, logistics
                or bad weather. We will keep you updated as much as we can and you should be
                able to track your parcel’s progress.<br/>
                <br/>
                Any problems with your delivery? Please let us know within 30 days of the date
                which your order should have been delivered and we’ll do our best to help you.
                </p>
                <hr/>

                <b>Returns and refunds</b>
                <p>
                If there is a problem with an order and/or the received products, please get in
                touch with our Merchant Support team https://help.printify.com/en/ within 30
                days of product delivery. Printify offers a free replacement or a refund in case of
                a damaged product or a manufacturing error. Alternatively, please get in touch<br/>
                with us- <a href = "mailto: abc@example.com">ernoidshop@gmail.com</a>
                <br/>
                <br/>
                The Printify balance will cover the production and shipping costs of new orders,
                or it can also be withdrawn to the same payment source where it originally came
                from.<br/>
                <br/>
                In case a replacement order is arranged, there is no need to send the original
                order back to us.<br/>
                <br/>
                Please note: If the order shipping details were incorrect, or if the customer
                ordered the wrong size or color, Printify will not be held responsible and will not
                offer replacements or refunds. You are responsible for capturing the right
                information from your customers.
                </p>
                <hr/>

                <b>Print on demand</b>
                <p>
                Print on demand (POD) is a dropshipping business model that allows producing
                printed apparel and products without an upfront investment.<br/>
                <br/>
                Using the latest printing methods — direct-to-garment (DTG) printing and
                all-over printing (AOP) — it is possible to produce one-off printed items at a low
                cost.<br/>
                <br/>
                When using the traditional printing methods, such as screen printing, it typically
                requires ordering printed stock in bulk to make it economically viable. This
                inherently involves some risk on the merchants’ part, as they will have invested
                their capital in the production of the goods.<br/>
                <br/>
                The POD business model eliminates this risk, since all stock is printed only when
                you’ve made a sale, thus allowing you to start a business with little to no capital.
                </p>

            </div>
        </div>
        )
    }

}