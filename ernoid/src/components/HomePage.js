import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Grid } from '@material-ui/core';
import data from "bootstrap/js/src/dom/data";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collection: 'place holder',
            sweatshirt: {},
            t_shirt: {},
            beanie: {},
            hoodie_v1: {},
            hoodie_v2: {},
            colour: null,
            description: null,
        };
        this.getClothing();
    }

    getClothing() {
        fetch("/api/featured-collection")
            .then((response) => response.json())
            .then((data) => {
               this.setState({
                   collection: data[0].collection,
                   colour: data[0].colour,
               });
               data.forEach((item) => {
                   this.setState({
                       ...(item.clothing_type === 'Sweatshirt') && {sweatshirt: item},
                       ...(item.clothing_type === 'Beanie') && {beanie: item},
                       ...(item.clothing_type === 'Hoodie') && {hoodie_v1: item},
                       ...(item.clothing_type === 'Hoodie_V2') && {hoodie_v2: item},
                       ...(item.clothing_type === 'T-Shirt') && {t_shirt: item}
                   })
               });
               console.log(this.state);
            });
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
                            <img src="https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_960_720.jpg" />
                        </div>
                        <div>
                            <img src="https://cdn.pixabay.com/photo/2016/01/19/17/41/friends-1149841_960_720.jpg" />
                        </div>
                        <div>
                            <img src="https://cdn.pixabay.com/photo/2018/03/26/20/49/tiger-3264048_960_720.jpg" />
                        </div>
                    </Carousel>
                </div>
                <div className={"home-featured"}>
                    <div className={"home-featured-title"}>
                        <b style={{letterSpacing: '.2rem'}}>FEATURED COLLECTION</b>
                        <p className={"home-featured-collection-title"}>{this.state.collection}</p>
                    </div>
                    <div>
                        {/* Left side of the preview featured collection */}
                        <Grid container direction="row" justify="center">
                            <div className={"home-featured-preview"}>
                                <Grid container direction="column">
                                    <div>
                                        <Grid container direction={"row"} alignItems="center">
                                            <div>
                                                <img className={"home-featured-preview-images"} src={this.state.sweatshirt.image}/>
                                            </div>
                                            <div>
                                                <Grid container direction={"column"} className={"home-featured-preview-description"}>
                                                    <b className={"home-featured-preview-description-collection"}>{this.state.collection}</b>
                                                    <p className={"home-featured-preview-description-type"}>{this.state.sweatshirt.clothing_type}</p>
                                                    <p className={"home-featured-preview-description-type"}>{this.state.sweatshirt.price} $</p>
                                                </Grid>
                                            </div>
                                        </Grid>
                                    </div>
                                    <div>
                                        <Grid container direction={"row"} alignItems="center">
                                            <div>
                                                <img className={"home-featured-preview-images"} src={this.state.t_shirt.image}/>
                                            </div>
                                            <div>
                                                <Grid container direction={"column"} className={"home-featured-preview-description"}>
                                                    <b className={"home-featured-preview-description-collection"}>{this.state.collection}</b>
                                                    <p className={"home-featured-preview-description-type"}>{this.state.t_shirt.clothing_type}</p>
                                                    <p className={"home-featured-preview-description-type"}>{this.state.t_shirt.price} $</p>
                                                </Grid>
                                            </div>
                                        </Grid>
                                    </div>
                                    <div>
                                        <Grid container direction={"row"} alignItems="center">
                                            <div>
                                                <img className={"home-featured-preview-images"} src={this.state.beanie.image}/>
                                            </div>
                                            <div>
                                                <Grid container direction={"column"} className={"home-featured-preview-description"}>
                                                    <b className={"home-featured-preview-description-collection"}>{this.state.collection}</b>
                                                    <p className={"home-featured-preview-description-type"}>{this.state.beanie.clothing_type}</p>
                                                    <p className={"home-featured-preview-description-type"}>{this.state.beanie.price} $</p>
                                                </Grid>
                                            </div>
                                        </Grid>
                                    </div>
                                </Grid>
                            </div>
                            {/* Center of the preview featured collection - colour picker and featured */}
                            <div className={"home-featured-preview-center"}>
                                <Grid container direction="column" justify="center" alignItems="center">
                                    <img className={"home-featured-main-image"} src={this.state.hoodie_v1.image}/>
                                    <Grid container direction="row">
                                        <img className={"home-featured-preview-images"} src={this.state.hoodie_v1.image}/>
                                        <img className={"home-featured-preview-images"} src={this.state.hoodie_v2.image}/>
                                    </Grid>
                                    <b className={"home-featured-main-colours"}>Colours</b>
                                    {/* TODO: Radio buttons for choosing colours */}
                                </Grid>
                            </div>
                            {/* Right side - description */}
                            <div>
                                <p className={"home-featured-collection"}>{this.state.collection}</p>
                                <p className={"home-featured-header"}>{this.state.hoodie_v1.header}</p>
                                <p className={"home-featured-description"}>{this.state.hoodie_v1.description}</p>
                                <p className={"home-featured-features"}> ] 50% Cotton 50% Polyester<br />
                                    ] Medium-heavy fabric<br />
                                    ] Classic fit<br />
                                    ] Tear away label<br />
                                    ] Runs true to size<br />
                                </p>
                            </div>
                        </Grid>
                    </div>
                </div>
            </Grid>
        );
    }
}