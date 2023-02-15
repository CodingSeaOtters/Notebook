import React from "react";
import Navbar from "./Navbar/Navbar"
import Main from "./Main"


export default class App extends React.Component {
    state = {
        loggedIn: false,
        register: false,
        user: {
            userName: "",
            userId: 0,
            password: "",
            repeatPassword: "",
            boards: null,
        }
    }

    logIn = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "username": this.state.user.userName,
            "password": this.state.user.password
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`http://localhost:8080/auth/login`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                localStorage.setItem("JWT", result);
                this.getUser();
                this.changeLoggedIn();
            })

            .catch(error => console.log('error', error));
    }


    getUser = () => {
        const myHeaders = new Headers();
        myHeaders.append("Bearer ", localStorage.getItem("JWT"));
        myHeaders.append("Content-Type", "application/json");


        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`http://localhost:8080/login`, requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    user: {
                        userName: result.userName,
                        userId: result.id,
                        boards: result.boards
                    }

                })


            })
            .catch(error => console.log('error', error));
    }

    handleRegister = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "username": this.state.user.userName,
            "password": this.state.user.password
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        if (this.state.user.password === this.state.user.repeatPassword) {
            fetch("http://localhost:8080/user", requestOptions)
                .then(response => response.json())
                .then(result => {
                    this.setState({
                        user: {
                            userId: result.id,
                            boards: result.boards
                        }
                    })

                })
                .catch(error => console.log('error', error));
        }
    }

    changeUserData = (event) => {
        const {name, value} = event.target;
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                [name]: value
            }
        }))
        console.log(this.state.user.userName, this.state.user.password)
    }


    changeLoggedIn = () => {
        this.setState(prevState => ({loggedIn: !prevState.loggedIn}));
    }

    changeRegisterTrue = () => {
        this.setState(({register: true}))
    }

    changeRegisterFalse = () => {
        this.setState(({register: false}))
    }


    render() {
        return (
            <div>

                <Navbar
                    loggedIn={this.state.loggedIn}
                    user={this.state.user}
                    changeRegisterTrue={this.changeRegisterTrue}
                    changeRegisterFalse={this.changeRegisterFalse}

                />
                <Main
                    logIn={this.logIn}
                    loggedIn={this.state.loggedIn}
                    register={this.state.register}
                    user={this.state.user}
                    changeUserData={this.changeUserData}
                    handleRegister={this.handleRegister}
                />
            </div>
        )
    }
}