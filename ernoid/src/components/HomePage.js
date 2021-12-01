import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Grid, FormControlLabel, Radio, RadioGroup, FormControl } from '@material-ui/core';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {CustomButton} from "../customComponents";
import { Link } from 'react-router-dom';
import store from "../redux/store";
import {addToCart} from "../redux/shopping/shopping-actions";


export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 'M',
            collection: 'place holder',
            sweatshirt: {},
            t_shirt: {},
            beanie: {},
            hoodie_v1: {},
            hoodie_v2: {},
            colour: 'Red',        // TODO: Change default 'Black' to red ?
            color_choices: [{'name': 'Red'}, {'name': 'White'}, {'name': 'Black'}], // TODO: Only these 3 colours available for the collection. Refactor this somehow? Add available colours to collection model?
            description: null,
        };
        this.getClothing('Red');
    }

    chooseSize(size) {
        // Make sure at least one size is always selected
        if (size !== null) {
            this.setState({
                size: size
            });
        }
    }

    addToCart() {
        let addedItem = this.state.hoodie_v1;
        let addedHoodieItem = {
            item_id: addedItem.item_id,
            size: this.state.size,
            item: {
                colour: addedItem.colour,
                collection: addedItem.collection,
                clothing_type: addedItem.clothing_type,
                preview_image: addedItem.image,
                price: addedItem.price
            }
        };

        store.dispatch(addToCart(addedHoodieItem));
        toast.success('Item has been added to the cart!', {
            autoClose: 3000,
            hideProgressBar: true
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
                       ...(item.clothing_type === 'Hoodie' && item.type_version === 1) && {hoodie_v1: item},
                       ...(item.clothing_type === 'Hoodie' && item.type_version === 2) && {hoodie_v2: item},
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

    renderBeanie() {
        /**
         * This function is needed, because censored beanie doesnt have white colour. So ignore this one, when white.
         * Very hardcoded, very bad.
         */
        if (this.state.colour !== 'White') {
            return  <Link to={"/item-selection/"+this.state.beanie.item_id}>
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
                    </Link>
        }
    }

    render() {

        {/* TODO: Change display images */}

        return (
            <Grid>
                <ToastContainer/>
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
                        <Grid container direction="row" justify={"center"} alignItems="center">
                            <div className={"home-featured-preview"}>
                                <Grid container direction="column" justify={"center"} alignItems="center">

                                    <div>
                                        <Link to={"/item-selection/"+this.state.sweatshirt.item_id}>
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
                                        </Link>
                                    </div>

                                    <div>
                                        <Link to={"/item-selection/"+this.state.t_shirt.item_id}>
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
                                        </Link>
                                    </div>

                                    <div>
                                        {this.renderBeanie()}
                                    </div>

                                </Grid>
                            </div>
                            {/* Center of the preview featured collection - colour picker and featured */}
                            <div className={"home-featured-preview-center"}>
                                <Grid container direction="column" justify="center" alignItems="center">
                                    <Link to={"/item-selection/"+this.state.hoodie_v1.item_id}>
                                        <img className={"home-featured-main-image"} src={this.state.hoodie_v1.image}/>
                                    </Link>
                                    <Grid container direction="row">
                                        <Link to={"/item-selection/"+this.state.hoodie_v1.item_id}>
                                            <img className={"home-featured-preview-images"} src={this.state.hoodie_v1.image}/>
                                        </Link>
                                        <Link to={"/item-selection/"+this.state.hoodie_v1.item_id}>
                                            <img className={"home-featured-preview-images"} src={this.state.hoodie_v1.back_image}/>
                                        </Link>
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
                                <div>
                                    <Grid container direction={"column"}>
                                        <div>
                                            <Grid container direction={"row"} alignItems={"center"}>
                                                <ToggleButtonGroup exclusive color="primary"
                                                                   value={this.state.size}
                                                                   onChange={(e, size) => this.chooseSize(size)}>
                                                  <ToggleButton className={"home-size-button"} value="S">S</ToggleButton>
                                                  <ToggleButton className={"home-size-button"} value="M">M</ToggleButton>
                                                  <ToggleButton className={"home-size-button"} value="L">L</ToggleButton>
                                                </ToggleButtonGroup>
                                                <p className={"item-selection-price"}>{this.state.hoodie_v1.price}$</p>
                                            </Grid>
                                        </div>
                                        <Grid className={"home-action-buttons"} container direction={"row"}>
                                            <Link to={"/item-selection/"+this.state.hoodie_v1.item_id}>
                                                <CustomButton>BUY</CustomButton>
                                            </Link>
                                            <CustomButton onClick={() => {this.addToCart()}}>ADD TO CART</CustomButton>
                                        </Grid>
                                    </Grid>
                                </div>
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