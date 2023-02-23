import React from "react";

export default class Note extends React.Component{

    state = {
        title: "",
        text: "",
        startDate:"",
        endDate: ""
    }

    componentDidMount() {
        this.getNote()
    }


    getNote = () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("JWT"));
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch(`http://localhost:8080/note/${this.props.noteId}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                this.setState({
                    title: result.title,
                    text: result.content,
                    startDate: result.startDate,
                    endDate: result.endDate
                });
            })
            .catch((error) => console.log("error", error));


    }

    render() {
        return (
            <div>
                <h5>{this.state.title}</h5>
                <p>{this.state.text}</p>
                <p>{this.state.startDate}</p>
                <p>{this.state.endDate}</p>
            </div>
        );
    }



}