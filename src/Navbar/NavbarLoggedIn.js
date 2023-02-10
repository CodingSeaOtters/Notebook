import React from "react";
export default class NavbarLoggedIn  extends React.Component {

    render() {
        return (
            <div className="Navbar">
               <h1 >Willkommen bei TaskMaster, {this.props.userName}</h1>
            </div>
        )
    }

}