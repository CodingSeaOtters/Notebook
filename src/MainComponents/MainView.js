import React from "react";
import Note from "./Note";
import UtilityBar from "./UtilityBar";
import CreateNoteDialog from "./Dialogs/CreateNoteDialog";

export default class MainView extends React.Component {

    state = {
        notes: [],
        list: [],
        open: false,
        content: {
            title: "",
            text: "",
            title_image_path: "",
            startDate: "",
            endDate: "",
        }
    }


    componentDidMount() {
        this.getNotes();
    }


    getNotes = () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("JWT"));
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch(`http://localhost:8080/board/note/${this.props.boardId}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({notes: result}, () => {
                    this.mapNotes();
                });
            })
            .catch(error => console.log("error", error));
    }

    createNote = () => {
        this.setState({open: true})
    }

    cancelModal = () => {
        this.setState({open: false})
    }

    changeContentState = (event) => {
        const {name, value} = event.target;
        this.setState(prevState => ({
            content: {
                ...prevState.content,
                [name]: value
            }
        }));
    }

    mapNotes = () => {
        this.mappedNotes = this.state.notes.map(n => (
            <div className="card w-25 mx-2 align-items-center">
                <div className="card-body">
                    <Note key={Math.random()} noteId={n}/>
                </div>
            </div>))
        this.forceUpdate()
    }

    confirmNote = () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("JWT"));
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "title": this.state.content.title,
            "content": this.state.content.text,
            "title_image_path": "",
            "startDate": this.state.content.startDate,
            "endDate": this.state.content.endDate
        })

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch(`http://localhost:8080/note/${this.props.boardId}`, requestOptions)
            .then(() => this.getNotes())
            .then(() => this.cancelModal())
            .catch((error) => console.log("error", error));

    }

    onClose = () => {
        this.setState({
            content: {
                title: "",
                text: "",
                title_image_path: "",
                startDate: "",
                endDate: "",
            }
        })
    }
    mappedNotes = this.state.notes.map(n => (<Note key={Math.random()} note={n}/>));


    render() {
        return (
            <div className="container-fluid">
                <UtilityBar createNote={this.createNote} boardName={this.props.boardName } changeClickedFalse={this.props.changeClickedFalse}/>
                <CreateNoteDialog
                    content={this.state.content}
                    changeContentState={this.changeContentState}
                    open={this.state.open}
                    confirmNote={this.confirmNote}
                    cancelModal={this.cancelModal}
                    onClose={this.onClose}

                />
                <div className="container align-items-center text-center">
                    <h4>Notizen</h4>
                    <div className="row row-cols-3 g-4 justify-content-center">
                        {this.mappedNotes}
                    </div>
                </div>
            </div>
        );
    }

}