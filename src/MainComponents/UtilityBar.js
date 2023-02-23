import React from "react";

export default class UtilityBar extends React.Component{

    render() {
        return (
            <div className="d-flex justify-content-between align-items-center my-3">
                <button className="btn btn-danger" onClick={this.props.changeClickedFalse}>Boards</button>
                <h3 className="ms-5 text-center">{this.props.boardName}</h3>
                <button className="btn btn-danger" onClick={this.props.createNote}>Notiz erstellen</button>
            </div>
        );
    }
}