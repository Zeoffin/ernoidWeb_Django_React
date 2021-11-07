import React, {Component, useEffect, useState} from 'react';
import { Grid } from '@material-ui/core';
import Button from "react-bootstrap/cjs/Button"
import Dropdown from "react-bootstrap/cjs/Dropdown";
import store from "../redux/store";
import { Link, useLocation } from "react-router-dom";

/**
 * The header file is responsible for the header bar and main navigation functionality.
 */

export default function Header() {

    let location = useLocation();

    const [collections, setCollections] = useState([]);
    const [count, setCount] = useState(store.getState().shop.itemsInCart);
    const [pathname, setPathname] = useState(location.pathname);

    useEffect(
        () => {
            setPathname(location.pathname); // Used for setting color of header location to white based on path
        }
    )

    store.subscribe(() => setCount(store.getState().shop.itemsInCart));

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
               <Dropdown.Item className={"header-dropdown-item"} as={Link} to={"../collection/"+collection_link_name}>{collection_name}</Dropdown.Item>
           );

        });
        return return_array

    }

    return (
        <div className={"header-style"}>
            <Grid container direction="row" justify="center" alignItems="center">

                <img className={"header-logo"} src={"/static/images/branding/ERNOID_Typography_White.png"}/>

                <div className={"header-navigation"}>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Button className={"header-dropdown-home"} as={Link} to={"/"}
                                style={pathname==="/" ? {color: 'white'} : {color: '#828282'}}>HOME</Button>
                        <Dropdown>
                          <Dropdown.Toggle className={"header-dropdown-toggle"}
                                           style={pathname==="/all-collections" || pathname.includes("/collection/") ? {color: 'white'} : {color: '#828282'}}>COLLECTIONS</Dropdown.Toggle>
                            {/* TODO: Dynamically add collections to the menu page */}
                            <Dropdown.Menu className={"header-dropdown-menu"}>
                                    <Dropdown.Item className={"header-dropdown-item"} as={Link} to="../all-collections">ALL COLLECTIONS</Dropdown.Item>
                                <Dropdown.Item className={"header-dropdown-item"} as={Link} to="../collection/classic">CLASSIC</Dropdown.Item>
                                <Dropdown.Item className={"header-dropdown-item"} as={Link} to="../collection/tilted-colors">TILTED COLORS</Dropdown.Item>
                                <Dropdown.Item className={"header-dropdown-item"} as={Link} to="../collection/censored">CENSORED</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown>
                          <Dropdown.Toggle className={"header-dropdown-toggle"}
                                           style={pathname.includes("/clothes/") ? {color: 'white'} : {color: '#828282'}}>CLOTHES</Dropdown.Toggle>

                            {/* TODO: dynamic arī vajadzētu :) */}
                          <Dropdown.Menu className={"header-dropdown-menu"}>
                            <Dropdown.Item className={"header-dropdown-item"} as={Link} to="../clothes/t-shirt">T-SHIRT</Dropdown.Item>
                            <Dropdown.Item className={"header-dropdown-item"} as={Link} to="../clothes/sweatshirt">SWEATSHIRT</Dropdown.Item>
                            <Dropdown.Item className={"header-dropdown-item"} as={Link} to="../clothes/hoodie">HOODIE</Dropdown.Item>
                            <Dropdown.Item className={"header-dropdown-item"} as={Link} to="../clothes/dress">DRESS</Dropdown.Item>
                            <Dropdown.Item className={"header-dropdown-item"} as={Link} to="../clothes/beanie">BEANIE</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>

                        <p className={"header-separator"}>|</p>
                        <Link className={"header-cart"} to={"/shopping-cart"}>
                                <img className={"header-cart-image"} src={"/static/images/assets/cart_white.png"} />
                        </Link>
                        <p className={"header-separator"}>{count}</p>

                    </Grid>
                </div>

            </Grid>
        </div>
    );
}