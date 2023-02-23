import React from "react";
import Board from "./Board";

export default class BoardsView extends React.Component {
    state = {
        boards: this.props.user.boards,
        input: "",
    }

    changeInputState = (event) => {
        const {value} = event.target;
        this.setState(prevState => {
            return ({
                    ...prevState,
                    input: value
                }
            )
        });
    }

    createBoard = () => {
        if(this.state.input !== "") {

            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem("JWT"));
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                boardName: this.state.input,
            })

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`http://localhost:8080/board/${this.props.user.userId}`, requestOptions)
                .then(response => {
                    this.refreshBoards();
                })
                .catch(error => console.log('error', error));
        } else {
            alert("Bitte namen eingeben")
        }
    }

    refreshBoards = () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("JWT"));
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`http://localhost:8080/board/all/${this.props.user.userId}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({
                        boards: result
                    }, () => {
                        this.updateMappedBoards()
                        this.setState({
                            input: ''
                        })
                    }
                );

            })
            .catch(error => console.log('error', error));
    }

    updateMappedBoards = () => {
        this.mappedBoards = this.state.boards.map(board => (
            <div className="card shadow-sm my-3">
                <div className="card-body">
                    <Board refreshBoards={this.refreshBoards} changeClicked={this.props.changeClicked} key={Math.random()}
                           boardId={board}
                    />
                </div>
            </div>));
        this.forceUpdate();
    }

    mappedBoards = this.state.boards.map(board => (
        <div className="card shadow-sm my-3">
            <div className="card-body">
                <Board changeClicked={this.props.changeClicked} key={Math.random()}
                       boardId={board}
                />
            </div>
        </div>))

    render() {
        return (
            <div className="container mt-5 ">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow">
                            <div className="card-body">
                                {this.mappedBoards}
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" value={this.state.input || ''}
                                           placeholder="Neues Board" onChange={this.changeInputState}/>
                                    <button className="btn btn-outline-secondary" className="btn btn-danger"
                                            onClick={this.createBoard} type="button">Hinzufügen
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}