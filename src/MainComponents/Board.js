import React from "react";
import ChangeBoardDialog from "./Dialogs/ChangeBoardDialog";

export default class Board extends React.Component {
    state = {
        boardId: 0,
        name: "",
        prevName: "",
        open: false,
    };


    changeOpen = () => {
        this.setState(prevState => ({open: !prevState.open}))
    }

    changeName = (event) => {
        const {value} = event.target;
        this.setState({name : value});
    }

    onClose = () => {
        this.setState({name: this.state.prevName})
        this.changeOpen();
    }

    confirmBoard = () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("JWT"));
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            boardName: this.state.name,
        })

        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`http://localhost:8080/board/${this.state.boardId}`, requestOptions)
            .then(() => {
                this.changeOpen();
                this.setState({prevName: this.state.name})
            })
            .catch(error => console.log('error', error));
    }

    componentDidMount() {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("JWT"));
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch(`http://localhost:8080/board/${this.props.boardId}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                this.setState({
                    name: result.boardName,
                    prevName: result.boardName,
                    boardId: result.boardId
                });
            })
            .catch((error) => console.log("error", error));
    }

    delete = () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("JWT"));
        myHeaders.append("Content-Type", "application/json");



        const requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`http://localhost:8080/board/${this.state.boardId}`, requestOptions)
            .then(() => {
            this.props.refreshBoards();
            })
            .catch(error => console.log('error', error));

    }

    render() {
        return (
            <div>
                <div className="d-flex">
                    <h4 onClick={() => this.props.changeClicked(this.props.boardId, this.state.name)}>{this.state.name}</h4>
                    <div className="dropdown ms-auto">
                        <button className="btn btn-danger btn-sm dropdown-toggle-split" type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"><b>...</b>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-dark text-center">
                            <li className="mb-2" onClick={this.changeOpen}><b>Bearbeiten</b></li>
                            <li onClick={this.delete}><b>Löschen</b></li>
                        </ul>
                    </div>
                </div>

                <ChangeBoardDialog
                    open={this.state.open}
                    name={this.state.name}
                    onClose={this.onClose}
                    changeName={this.changeName}
                    changeOpen={this.changeOpen}
                    confirmBoard={this.confirmBoard}
                />
            </div>
        );
    }
}