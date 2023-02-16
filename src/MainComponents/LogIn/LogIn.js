import React from "react";

export default class LogIn extends React.Component {

    render() {
        return(
            <div className="flex">
                <label htmlFor="userName">Benutzername</label>
                <input type="text" name="userName" value={this.props.user.userName || ''} onChange={this.props.changeUserData} placeholder="Benutzername"/>
                <label htmlFor="password">Passwort</label>
                <input type="password" name="password" value={this.props.user.password || ''} onChange={this.props.changeUserData} placeholder="Password"/>
                <button onClick={this.props.logIn}>Klick mich </button>
            </div>
        )
    }

}