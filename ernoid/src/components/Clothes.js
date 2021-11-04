import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";

export default class Clothes extends Component {
    constructor(props) {
        super(props);
        this.clothingType = this.props.match.params.clothingType;
        this.state = {
            items: []
        }
        this.getClothes();
    }

    getClothes() {
        fetch('/api/type-items?item_type=' + this.clothingType)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    items: data
                })
        });
    }

    setupAllClothes() {
        let return_array = []
        this.state.items.forEach((item) => {
            return_array.push(
                <a href={"/item-selection/"+item.item_id}>
                    <div className={"collection-main-item"}>
                        <Grid container direction={"row"} alignItems="center">
                            <div>
                                <img className={"home-featured-preview-images"} src={item.preview_image}/>
                            </div>
                            <div>
                                <Grid container direction={"column"} className={"home-featured-preview-description"}>
                                    <b className={"home-featured-preview-description-collection"}>{item.collection}</b>
                                    <p className={"home-featured-preview-description-type"}>{item.price} $</p>
                                </Grid>
                            </div>
                        </Grid>
                    </div>
                </a>
            )
        });
        return return_array

    }

    render() {

        return (
            <div className={"collection-main"}>
                <b className={"collection-text"}>{this.clothingType}</b>
                <Grid container direction={"row"} alignItems="center" justify="center">
                    {this.setupAllClothes()}
                </Grid>
            </div>
        );
    }
}