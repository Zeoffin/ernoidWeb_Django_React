import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import {FormControl, FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {CustomButton, ItemCustomButton} from "../customComponents";
import store from "../redux/store";
import {addToCart} from "../redux/shopping/shopping-actions";
import {Link} from "react-router-dom";

export default class ItemSelection extends Component {
    constructor(props) {
        super(props);
        this.itemId = this.props.match.params.itemId;
        this.state = {
            size: 'M',
            item_id: this.itemId,
            item: {},
            colors: []
        }
        this.getSelectedItem();
    }

    addToCart() {
        toast.success('Item has been added to the cart!', {
            autoClose: 2000,
            hideProgressBar: true
        });
        store.dispatch(addToCart(this.state));
    }

    chooseSize(size) {
        // Make sure at least one size is always selected
        if (size !== null) {
            this.setState({
                size: size
            });
        }
    }

    getSelectedItem(colorItemId) {
        if (colorItemId) {
            this.itemId = colorItemId;
            this.setState({
                item_id: colorItemId
            })
        }
        fetch('/api/selected-item?item_id=' + this.itemId)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    item: data.selected_item,
                    colors: data.colors
                })
        });
    }

    colourChoice() {
        let colours = this.state.colors;
        let html_array = [];

        if (colours.length > 0) {
            colours.forEach((colour) => {
                html_array.push(<FormControlLabel value={colour.color} control={<Radio onChange={(e) => this.getSelectedItem(colour.item_id)}
                    style={{
                        color: colour.color,
                        backgroundColor: colour.color,
                        outline: '1px solid black',
                        width: '30px',
                        height: '30px',
                        marginLeft: '30px',
                        marginTop: '10px'}}
                />} label="" />);
            });
        }

        return html_array
    }

    checkIfBackImage() {
        let render_array = [];
        if (this.state.item.preview_image_back) {
            render_array.push(
                <Grid container direction="row">
                    <img className={"home-featured-preview-images"} src={this.state.item.preview_image}/>
                    <img className={"home-featured-preview-images"} src={this.state.item.preview_image_back}/>
                </Grid>
            )
        }

        return render_array
    }

    sizeChoice() {
        /**
         *  Formats size choice. If its beanie, leave only M size option. For everything else have S/M/L.
         **/

        let render_array = []
        if (this.state.item.clothing_type !== 'Beanie') {
            render_array.push(
                <ToggleButtonGroup exclusive color="primary"
                                   value={this.state.size}
                                   onChange={(e, size) => this.chooseSize(size)}>
                    <ToggleButton className={"home-size-button"} value="S">S</ToggleButton>
                    <ToggleButton className={"home-size-button"} value="M">M</ToggleButton>
                    <ToggleButton className={"home-size-button"} value="L">L</ToggleButton>
                </ToggleButtonGroup>
            )
        }

        return render_array

    }

    render() {

        return (
            <div className={"collection-main"}>
                <b className={"collection-text"}>ITEM SELECTION</b>
                <ToastContainer/>
                <Grid container direction={"row"} alignItems={"center"} justify={"center"}>
                    {/* Center of the preview featured collection - colour picker and featured */}
                    <div className={"home-featured-preview-center"}>
                        <Grid container direction="column" justify="center" alignItems="center">
                            <img className={"home-featured-main-image"} src={this.state.item.preview_image}/>
                            {this.checkIfBackImage()}
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
                        <p className={"home-featured-collection"}>{this.state.item.collection}</p>
                        <p className={"home-featured-header"}>{this.state.item.clothing_type}</p>
                        <p className={"home-featured-description"}>{this.state.item.description}</p>
                        <p className={"home-featured-features"}>
                            ] 50% Cotton 50% Polyester<br />
                            ] Medium-heavy fabric<br />
                            ] Classic fit<br />
                            ] Tear away label<br />
                            ] Runs true to size<br />
                        </p>
                        <div>
                            <Grid container direction={"column"}>
                                {this.sizeChoice()}
                                <Grid className={"home-action-buttons"} container direction={"row"}>
                                    <CustomButton>BUY</CustomButton>
                                    <CustomButton onClick={() => {this.addToCart()}}>ADD TO CART</CustomButton>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </Grid>
            </div>
        )

    }
}