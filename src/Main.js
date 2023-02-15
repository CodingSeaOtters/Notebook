import React from "react";
import LogIn from "./MainComponents/LogIn";
import Register from "./MainComponents/Register";

export default class Main extends React.Component{

    // logIn
    // loggedIn
    // register
    // user
    // changeUserData

    render() {
        return (
            <div>{((!this.props.loggedIn && !this.props.register) &&
                <LogIn changeUserData={this.props.changeUserData} logIn={this.props.logIn} user={this.props.user}/>) }

                {(!this.props.loggedIn && this.props.register) && <Register user={this.props.user} handleRegister={this.props.handleRegister} changeUserData={this.props.changeUserData}/>}
            </div>)


    }

}