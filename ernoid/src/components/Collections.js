import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";

export default class Collections extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collections: []
        };
        this.getCollections();
    }

    getCollections() {
        fetch('/api/collections')
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    collections: data
                })
            });
    }

    setupCollection() {
        console.log('Setup collection');
        let return_array = []
        this.state.collections.forEach((collection) => {

            // Take collection name and ensure its in the right format for <a> link
            let collection_name = collection.name.split(' ').join('-').toLowerCase();

            // Return array for each collection
            return_array.push(
                <a href={"collection/"+collection_name} className={"collection-link"}>
                    <div className={"collection-container"}>
                        <Grid container direction={"column"} alignItems="center" justify="center">
                            <img className={"collection-logo"} src={collection.collection_logo}/>
                            <b className={"collections-name"}>{collection.name}</b>
                            <p className={"collections-description"}>{collection.description}</p>
                        </Grid>
                    </div>
                </a>
            )
        });
        return return_array
    }

    render() {
        return (
            <Grid>
                <div className={"collections-main"}>
                    <b className={"collections-text"}>COLLECTIONS</b>
                    <Grid container direction={"row"} alignItems="center" justify="center">
                        {this.setupCollection()}
                    </Grid>
                </div>
            </Grid>
        );
    }
}