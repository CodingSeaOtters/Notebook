import React from "react";

export default class NavbarLoggedOut extends React.Component {

    render() {
        return (
            <div className="Navbar">
                <button name="register" onClick={this.props.changeRegisterTrue}>Registrieren</button>
                <button name="signIn" onClick={this.props.changeRegisterFalse}>Anmelden</button>
            </div>
        )
    }

}