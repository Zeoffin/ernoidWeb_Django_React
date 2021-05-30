import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import Button from "react-bootstrap/cjs/Button"
import Dropdown from "react-bootstrap/cjs/Dropdown";

/**
 * The header file is responsible for the header bar and main navigation functionality.
 */
export default class HomePage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"header-style"}>
                <Grid container direction="row" justify="center" alignItems="center">

                    <p className={"header-logo"}>IMG ERNOID</p>

                    <div className={"header-navigation"}>
                        <Grid container direction="row" justify="center" alignItems="center">
                            <Button className={"header-dropdown-home"}>HOME</Button>

                            <Dropdown>
                              <Dropdown.Toggle className={"header-dropdown-toggle"}>
                                COLLECTIONS
                              </Dropdown.Toggle>

                              <Dropdown.Menu className={"header-dropdown-menu"}>
                                <Dropdown.Item className={"header-dropdown-item"} href="#/action-1">CLASSIC</Dropdown.Item>
                                <Dropdown.Item className={"header-dropdown-item"} href="#/action-2">TILTED COLORS</Dropdown.Item>
                                <Dropdown.Item className={"header-dropdown-item"} href="#/action-3">CENSORED</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>

                            <Dropdown>
                              <Dropdown.Toggle className={"header-dropdown-toggle"}>
                                CLOTHES
                              </Dropdown.Toggle>

                              <Dropdown.Menu className={"header-dropdown-menu"}>
                                <Dropdown.Item className={"header-dropdown-item"} href="#/action-1">T-SHIRT</Dropdown.Item>
                                <Dropdown.Item className={"header-dropdown-item"} href="#/action-2">SWEATSHIRT</Dropdown.Item>
                                <Dropdown.Item className={"header-dropdown-item"} href="#/action-3">HOODIE</Dropdown.Item>
                                <Dropdown.Item className={"header-dropdown-item"} href="#/action-4">DRESS</Dropdown.Item>
                                <Dropdown.Item className={"header-dropdown-item"} href="#/action-5">HAT</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                        </Grid>
                    </div>

                    {/* TODO: Cart checkout */}

                </Grid>
            </div>
        );
    }
}