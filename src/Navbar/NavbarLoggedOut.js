import React from "react";

export default class NavbarLoggedOut extends React.Component {

    render() {
        return (
            <div className="Navbar">
                <button onClick={() => this.props.logIn("Alfred")}>Registrieren</button>
                <button>Anmelden</button>
            </div>
        )
    }

}