import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";

export default function Footer() {

    return (
        <Grid className={"footer-main"} container direction="row" justify="space-around">
            <div className={"footer-main-div"}>
                <Grid className={"footer-main-div"} container direction="column">
                    <b>ERNOID</b>
                    <p>YOUR STYLE</p>
                    <p>YOUR CHOICE</p>
                    <p style={{fontSize: '13px', marginTop: '40px'}}>©2021 ERNOID. All rights reserved.</p>
                </Grid>
            </div>
            <div className={"footer-main-div"} style={{marginRight: '80px'}}>
                <Grid className={"footer-main-div"} container direction="column"  alignItems="center">
                    <b>FOLLOW</b>
                        <a href="https://instagram.com/ernoid?utm_medium=copy_link" style={{textDecoration: 'none'}}>
                            <Grid container direction="row" alignItems="center">
                                <img className={"footer-pic-limit"} style={{maxHeight: '30px'}} src={"static/images/assets/insta_white.png"}/>
                                <p>ERNOID</p>
                            </Grid>
                        </a>
                </Grid>
            </div>
            <div className={"footer-main-div"}>
                <Grid className={"footer-main-div"} container direction="column">
                    <b>LEGAL</b>
                    <p>Terms</p>
                    <p>Privacy</p>
                    <img className={"footer-pic-limit"} style={{maxHeight: '30px', marginTop: '40px'}} src={"static/images/assets/payment_methods.png"}/>
                </Grid>
            </div>
        </Grid>
    );
}