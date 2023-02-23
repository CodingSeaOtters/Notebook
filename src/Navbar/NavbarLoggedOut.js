import React from "react";

export default class NavbarLoggedOut extends React.Component {

    render() {
        return (
            <nav className="navbar navbar-expand bg-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    <span className="navbar-brand text-danger fs-3">TaskMaster</span>
                    <div className="navbar-nav ml-auto">
                        <button className="btn btn-dark text-white fs-5"
                                onClick={this.props.changeRegisterTrue}>Registrieren
                        </button>
                        <button className="btn btn-dark text-white fs-5"
                                onClick={this.props.changeRegisterFalse}>Anmelden
                        </button>
                    </div>
                </div>
            </nav>

        )
    }

}