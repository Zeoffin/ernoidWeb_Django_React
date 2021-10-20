import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";

export default class Collection extends Component {
    constructor(props) {
        super(props);
        this.collectionName = this.props.match.params.collectionName;
        this.state = {
            collection: this.collectionName,
            default_colour: '#FFFFFF',
            items: []
        };
        this.getCollectionClothes();
    }

    getCollectionClothes() {
        fetch('/api/collection-items?collection=' + this.collectionName)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    collection: data.collection,
                    default_colour: data.default_colour,
                    items: data.items
                })
        });
    }

    setupCollectionItemGrid() {
        let return_array = []
        this.state.items.forEach((item) => {
            return_array.push(
                <div className={"collection-main-item"}>
                    <Grid container direction={"row"} alignItems="center">
                        <div>
                            <img className={"home-featured-preview-images"} src={item.preview_image}/>
                        </div>
                        <div>
                            <Grid container direction={"column"} className={"home-featured-preview-description"}>
                                <b className={"home-featured-preview-description-collection"}>{this.state.collection}</b>
                                <p className={"home-featured-preview-description-type"}>{item.type}</p>
                                <p className={"home-featured-preview-description-type"}>{item.price} $</p>
                            </Grid>
                        </div>
                    </Grid>
                </div>
            )
        });
        return return_array

    }

    render() {
        return (
            <div className={"collection-main"}>
                <b className={"collection-text"}>{this.state.collection}</b>
                <Grid container direction={"row"} alignItems="center" justify="center">
                    {this.setupCollectionItemGrid()}
                </Grid>
            </div>
        )
    }

}