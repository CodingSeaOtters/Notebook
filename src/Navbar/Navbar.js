import React from "react";
import NavbarLoggedIn from "./NavbarLoggedIn"
import NavbarLoggedOut from "./NavbarLoggedOut"
export default class Navbar extends React.Component {
    render(){
        return (
            (this.props.loggedIn && <NavbarLoggedIn />) || <NavbarLoggedOut logIn={this.props.logIn} />

        );
    }
}