import React from "react";

export default class NavbarLoggedIn extends React.Component {

    render() {
        return (
            <nav className="navbar bg-dark" data-bs-theme="dark">
                <div className="container-fluid fs-4">
                    <span className="navbar-text text-white ">
                    Willkommen bei TaskMaster, {this.props.user.userName}!
                    </span>

                    <button className="btn btn-danger" onClick={this.props.logOut}>Log out!</button>

                </div>
            </nav>


        )
    }

}