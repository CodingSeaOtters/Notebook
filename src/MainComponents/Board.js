import React from "react";

export default class Board extends React.Component {
    state = {
        boardId: 0,
        name: "",
    };

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
                    boardId: result.boardId
                });
            })
            .catch((error) => console.log("error", error));
    }

    render() {
        return (
            <div onClick={() => this.props.changeClicked(this.props.boardId)}>
                <p>{this.state.name}</p>
            </div>
        );
    }
}