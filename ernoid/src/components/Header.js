import React, {Component, useState} from 'react';
import { Grid } from '@material-ui/core';
import Button from "react-bootstrap/cjs/Button"
import Dropdown from "react-bootstrap/cjs/Dropdown";

/**
 * The header file is responsible for the header bar and main navigation functionality.
 */

export default function Header() {
    const [collections, setCollections] = useState([])

    let pathname = window.location.pathname.toString();

    const getCollections = () => {
        fetch('/api/collections')
            .then((response) => response.json())
            .then((data) => {
                setCollections(data);
            });
    }

    // TODO: Dynamic collection - this function should be made correctly as a component or smt else so collections
    //  are dynamically added to the header
    function collectionDropdown () {
        getCollections();
        let return_array = []
        collections.forEach((collection_data) => {

            // Ensure the collection name is in the right format
           let collection_link_name = collection_data.name.split(' ').join('-').toLowerCase();
           let collection_name = collection_data.name.toUpperCase();

           return_array.push(
               <Dropdown.Item className={"header-dropdown-item"} href={"../collection/"+collection_link_name}>{collection_name}</Dropdown.Item>
           );

        });
        return return_array

    }

    return (
        <div className={"header-style"}>
            <Grid container direction="row" justify="center" alignItems="center">

                <img className={"header-logo"} src={"static/images/branding/ERNOID_Typography_White.png"}/>

                <div className={"header-navigation"}>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Button className={"header-dropdown-home"} href={"/"}
                                style={pathname==="/" ? {color: 'white'} : {color: '#828282'}}>HOME</Button>

                        <Dropdown>
                          <Dropdown.Toggle className={"header-dropdown-toggle"}
                                           style={pathname==="/all-collections" || pathname.includes("/collection/") ? {color: 'white'} : {color: '#828282'}}>COLLECTIONS</Dropdown.Toggle>
                            {/* TODO: Dynamically add collections to the menu page */}
                            <Dropdown.Menu className={"header-dropdown-menu"}>
                                <Dropdown.Item className={"header-dropdown-item"} href="../all-collections">ALL COLLECTIONS</Dropdown.Item>
                                <Dropdown.Item className={"header-dropdown-item"} href="../collection/classic">CLASSIC</Dropdown.Item>
                                <Dropdown.Item className={"header-dropdown-item"} href="../collection/tilted-colors">TILTED COLORS</Dropdown.Item>
                                <Dropdown.Item className={"header-dropdown-item"} href="../collection/censored">CENSORED</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown>
                          <Dropdown.Toggle className={"header-dropdown-toggle"}
                                           style={pathname==="/clothes" ? {color: 'white'} : {color: '#828282'}}>CLOTHES</Dropdown.Toggle>

                          <Dropdown.Menu className={"header-dropdown-menu"}>
                            <Dropdown.Item className={"header-dropdown-item"} href="../clothes/t-shirt">T-SHIRT</Dropdown.Item>
                            <Dropdown.Item className={"header-dropdown-item"} href="../clothes/sweatshirt">SWEATSHIRT</Dropdown.Item>
                            <Dropdown.Item className={"header-dropdown-item"} href="../clothes/hoodie">HOODIE</Dropdown.Item>
                            <Dropdown.Item className={"header-dropdown-item"} href="../clothes/dress">DRESS</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                    </Grid>
                </div>

                {/* TODO: Cart checkout */}

            </Grid>
        </div>
    );
}