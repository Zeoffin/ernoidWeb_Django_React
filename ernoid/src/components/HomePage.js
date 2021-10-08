import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Grid } from '@material-ui/core';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    getClothing() {
        fetch("/api/clothing")
    }

    render() {

        {/* TODO: Change display images */}

        return (
            <Grid>
                <div>
                    <Carousel className={"home-main"} autoPlay={"true"}
                              showThumbs={false}
                              showArrows={false}
                              showStatus={false}
                              infiniteLoop={true}
                              dynamicHeight={true}
                              interval={3000}>
                        <div>
                            <img src="http://lorempixel.com/output/cats-q-c-640-480-1.jpg" />
                        </div>
                        <div>
                            <img src="http://lorempixel.com/output/cats-q-c-640-480-2.jpg" />
                        </div>
                        <div>
                            <img src="http://lorempixel.com/output/cats-q-c-640-480-3.jpg" />
                        </div>
                    </Carousel>
                </div>
                <div className={"home-featured"}>
                    <div className={"home-featured-title"}>
                        <b>FEATURED COLLECTION</b>
                        <p>CENSORED</p>
                    </div>
                    <div>
                        <Grid container direction="row" justify="center" alignItems="center">
                            <p>Viens</p>
                            <p>Divi</p>
                            <p>Trīs</p>
                        </Grid>
                    </div>
                </div>
            </Grid>
        );
    }
}