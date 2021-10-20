import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Grid, FormControlLabel, Radio, RadioGroup, FormControl } from '@material-ui/core';

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
            colour: 'Black',
            color_choices: [],
            description: null,
        };
        this.getClothing('Black');  // Set default selected colour to black
        this.getColours();
    }

    getColours() {
        fetch("/api/colours")
            .then((response) => response.json())
            .then((data) => {
               this.setState({
                 color_choices: data
               });
            });
    }

    getClothing(chosen_color) {

        if (chosen_color) {
            this.setState({
                colour: chosen_color
            })
        }

        fetch("/api/featured-collection?colour="+chosen_color)
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
            });
    }

    colourChoice() {
        let colours = this.state.color_choices;
        let html_array = [];

        colours.forEach((colour) => {
            html_array.push(<FormControlLabel value={colour.name} control={<Radio onChange={(e) => this.getClothing(colour.name)}
                style={{
                    color: colour.name,
                    backgroundColor: colour.name,
                    outline: '1px solid black',
                    width: '30px',
                    height: '30px',
                    marginLeft: '30px',
                    marginTop: '10px'}}
            />} label="" />);
        });

        return html_array
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
                                    <div>
                                        <FormControl component="fieldset">
                                                <RadioGroup row aria-label="colours" name="radio-buttons-group">
                                                {this.colourChoice()}
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                </Grid>
                            </div>
                            {/* Right side - description */}
                            <div>
                                <p className={"home-featured-collection"}>{this.state.collection}</p>
                                <p className={"home-featured-header"}>{this.state.hoodie_v1.header}</p>
                                <p className={"home-featured-description"}>{this.state.hoodie_v1.description}</p>
                                <p className={"home-featured-features"}>
                                    ] 50% Cotton 50% Polyester<br />
                                    ] Medium-heavy fabric<br />
                                    ] Classic fit<br />
                                    ] Tear away label<br />
                                    ] Runs true to size<br />
                                </p>
                            </div>
                        </Grid>
                        {/* Description part of everything :) */}
                        <div className={"home-description-container"}>
                            <Grid container direction="row" justify="center" alignItems="center">
                                <img className={"home-description-image"} src={"/static/images/branding/TILTED_COLORS_Cover.png"}/>
                                <div className={"home-description-text-container"}>
                                    <Grid container direction="column">
                                        <p className={"home-featured-collection"}>ERNOID</p>
                                        <p className={"home-description-slogan"}>YOUR STYLE<br/>
                                        YOUR CHOICE</p>
                                        <p className={"home-description-textbox"}>The brand ''ERNOID'' is all about expanding your choice<br/>
                                        to find the style that suites you. Creating simple and<br/>
                                        timeless clothing designs, makes them flexible to<br/>
                                        combine with variety of styles.</p>
                                    </Grid>
                                </div>
                            </Grid>
                        </div>
                    </div>
                </div>
            </Grid>
        );
    }
}