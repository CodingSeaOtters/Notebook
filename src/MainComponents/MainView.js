import React from "react";

export default class MainView extends React.Component {

    state = {
        notes: []
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
                console.log(result)
            })
            .catch((error) => console.log("error", error));
    }

}