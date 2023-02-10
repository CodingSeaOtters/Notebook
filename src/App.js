import React from "react";
import Navbar from "./Navbar/Navbar"
import Main from "./Main"


export default class App extends React.Component {
    state = {
        loggedIn: false,
        user: {
            userName: "",
            userId: 0
        }
    }



    logIn(userName, password){
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            mode: 'no-cors'
        };

        fetch(`http://localhost:8080/user/find/${userName}`, requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        console.log('miau')

    }

    changeLoggedIn=() => {
        this.setState(prevState => ({loggedIn: !prevState.state.loggedIn}));
    }

    render() {
        return (
            <div>

                <Navbar
                    loggedIn={this.state.loggedIn}
                    logIn={this.logIn}
                />
                <Main
                    loggedIn={this.state.loggedIn}
                    toggleLoggedIn={this.changeLoggedIn}
                />
            </div>
        )
    }
}