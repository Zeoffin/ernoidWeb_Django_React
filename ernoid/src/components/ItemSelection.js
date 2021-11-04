import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import {FormControl, FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import styled from "@material-ui/core/styles/styled";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

    const CustomButton = styled(Button)({
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        border: '2px solid',
        lineHeight: 1.5,
        backgroundColor: 'white',
        borderColor: 'black',
        borderRadius: '30px',
        '&:hover': {
            backgroundColor: 'black',
            color: 'white'
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: 'white',
        },
    });

export default class ItemSelection extends Component {
    constructor(props) {
        super(props);
        this.itemId = this.props.match.params.itemId;
        this.state = {
            size: 'M',
            selected_id: this.itemId,
            item: {},
            colors: []
        }
        this.getSelectedItem();
    }

    addToCart() {
        toast.success('Item has been added to the cart!', {
            autoClose: 3000,
            hideProgressBar: true
        });
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
                selected_id: colorItemId
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

        if (colours.length > 1) {
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

    render() {

        return (
            <div className={"collection-main"}>
                <ToastContainer/>
                <Grid container direction={"column"} alignItems="center" justify="center">
                    <Grid container direction={"row"} alignItems="center" justify="center">
                        <div className={"collection-main-item"}>
                            <Grid container direction={"row"} alignItems="center">
                                <div>
                                    <img className={"home-featured-preview-images"} src={this.state.item.preview_image}/>
                                </div>
                                <div>
                                    <Grid container direction={"column"} className={"home-featured-preview-description"}>
                                        <b className={"home-featured-preview-description-collection"}>{this.state.item.collection}</b>
                                        <p className={"home-featured-preview-description-type"}>{this.state.item.clothing_type}</p>
                                        <p className={"home-featured-preview-description-type"}>{this.state.item.price} $</p>
                                    </Grid>
                                </div>
                            </Grid>
                        </div>
                    </Grid>
                    <div>
                        <FormControl component="fieldset">
                            <RadioGroup row aria-label="colours" name="radio-buttons-group">
                                {this.colourChoice()}
                            </RadioGroup>
                        </FormControl>
                        <ToggleButtonGroup exclusive color="primary"
                                           value={this.state.size}
                                           onChange={(e, size) => this.chooseSize(size)}>
                            <ToggleButton className={"home-size-button"} value="S">S</ToggleButton>
                            <ToggleButton className={"home-size-button"} value="M">M</ToggleButton>
                            <ToggleButton className={"home-size-button"} value="L">L</ToggleButton>
                        </ToggleButtonGroup>
                        <CustomButton onClick={() => {console.log('BUY CLICKED');}}>
                            BUY
                        </CustomButton>
                        <CustomButton onClick={() => {this.addToCart()}}>
                            ADD TO CART
                        </CustomButton>
                    </div>
                </Grid>
            </div>
        );
    }
}