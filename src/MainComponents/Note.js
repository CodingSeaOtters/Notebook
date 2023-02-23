import React from "react";
import CreateNoteDialog from "./Dialogs/CreateNoteDialog";

export default class Note extends React.Component {

    state = {
       content: {
           id: 0,
           title: "",
           text: "",
           startDate: "",
           endDate: "",
       },
        open: false
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
                   content: {
                       id: result.id,
                       title: result.title,
                       text: result.content,
                       startDate: result.startDate,
                       endDate: result.endDate
                   }
                });
            })
            .catch((error) => console.log("error", error));


    }

    modifyNote = () => {
        this.setState({open: true})
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

        fetch(`http://localhost:8080/note/${this.state.id}`, requestOptions)
            .then(() => {
                this.props.getNotes();
            })
            .catch(error => console.log('error', error));

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
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch(`http://localhost:8080/note/${this.state.content.id}`, requestOptions)
            .then(() => {
                this.props.getNotes();
                this.cancelModal()
            })
            .catch((error) => console.log("error", error));

    }

    cancelModal = () => {
        this.setState({open: false})
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

    render() {
        return (
            <div>
                <div className="dropdown ml-auto">
                    <button className="btn btn-danger btn-sm dropdown-toggle-split" type="button" data-bs-toggle="dropdown" aria-expanded="false"><b>. . .</b></button>
                    <ul className="dropdown-menu dropdown-menu-dark text-center">
                        <li className="mb-2" onClick={this.modifyNote}><b>Bearbeiten</b></li>
                        <li onClick={this.delete}><b>Löschen</b></li>
                    </ul>
                </div>
                <div className="row">
                    <h3 className="fs-4 mt-3 text-center">{this.state.content.title}</h3>
                    <hr className="border border-danger border-2 my-3"/>
                    <p className="">{this.state.content.text}</p>
                    <hr className="border border-danger border-2 my-3"/>
                    <div className="justify-content-end">
                        <div className="">Start: {this.state.content.startDate}</div>
                        <div className="">End: {this.state.content.endDate}</div>
                    </div>
                </div>
                <CreateNoteDialog
                    content={this.state.content}
                    changeContentState={this.changeContentState}
                    open={this.state.open}
                    confirmNote={this.confirmNote}
                    cancelModal={this.cancelModal}
                    onClose={this.onClose}
                />
            </div>
        );
    }
}