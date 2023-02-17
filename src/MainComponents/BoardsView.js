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
        this.mappedBoards = this.state.boards.map(board => <Board changeClicked={this.props.changeClicked} key={Math.random()} boardId={board}/>);
        this.forceUpdate();
    }

    mappedBoards = this.state.boards.map(board => <Board changeClicked={this.props.changeClicked} key={Math.random()} boardId={board}/>)

    render() {
        return (
            <div>
                {this.mappedBoards}
                <input value={this.state.input || ''} placeholder="Neues Board" onChange={this.changeInputState}/>
                <button onClick={this.createBoard}>Neues Board erstellen</button>
            </div>
        )
    }
}