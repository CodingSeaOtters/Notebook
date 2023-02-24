import React from "react";
import Navbar from "./Navbar/Navbar"
import Main from "./Main"

export default class App extends React.Component {
    state = {
        loggedIn: false,
        register: false,
        logInWarning: false,
        user: {
            userName: "",
            userId: localStorage.getItem("userId") || 0,
            password: '',
            repeatPassword: '',
            boards: [],
        }
    }

    componentDidMount() {
        if (localStorage.getItem("JWT")) {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem("JWT"));
            myHeaders.append("Content-Type", "application/json");

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            const userId = this.state.user.userId
            fetch(`http://localhost:8080/auth/refresh/${userId}`, requestOptions)
                .then(async response => {
                    if (response.accepted) {
                        this.changeLoggedIn();
                        let result = response.json()
                        localStorage.setItem("userId", result.id);
                        this.setState({
                            user: {
                                userName: result.userName,
                                userId: result.id,
                                boards: result.boards
                            }
                        }, this.forceUpdate)
                    } else if (response.ok) {
                        localStorage.setItem("JWT", await response.text())
                        this.changeLoggedIn();
                    } else {
                        console.log("Unauthorized access")
                    }
                })
        }
    }

    logIn = () => {
        if (this.state.user.userName !== '' && this.state.user.password !== '') {
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
                .then(response => {
                    if (response.ok) {
                        return response.text()
                    } else {
                        this.setState(p => ({
                            logInWarning: true,
                            user: {
                                ...p.user,
                                password: ''
                            }
                        }))
                        throw new Error('Du hast verstanzelt')
                    }
                })
                .then(result => {
                    localStorage.setItem("JWT", result);
                    this.getUser();
                })
                .catch(error => console.log('error', error));
        } else {
            alert("Bitte Benutzernamen und/oder Password eingeben!")
        }
    }

    getUser = () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("JWT"));
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const username = this.state.user.userName

        fetch(`http://localhost:8080/user/find/${username}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                localStorage.setItem("userId", result.id);
                this.setState({
                    user: {
                        userName: result.userName,
                        userId: result.id,
                        boards: result.boards
                    }
                }, () => {
                    this.changeLoggedIn()
                    this.forceUpdate()
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

    logOut = () => {
        this.changeLoggedIn();
        localStorage.removeItem("JWT");
        localStorage.removeItem("userId");
        this.setState(prevState => ({
            ...prevState,
            user: {
                userName: "",
                userId: 0,
                password: '',
                repeatPassword: '',
                boards: [],
            }
        }))
    }

    render() {
        return (
            <div>

                <Navbar
                    loggedIn={this.state.loggedIn}
                    user={this.state.user}
                    changeRegisterTrue={this.changeRegisterTrue}
                    changeRegisterFalse={this.changeRegisterFalse}
                    logOut={this.logOut}

                />
                <Main
                    logInWarning={this.state.logInWarning}
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