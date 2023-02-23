import React from "react";
import Modal from "react-bootstrap/Modal";

export default class ChangeBoardDialog extends React.Component{
    render() {
        const {open, name, changeName, onClose, confirmBoard}  = this.props;

        return (


            <Modal show={open}>
                <Modal.Header>
                    <Modal.Title>Neue Notiz erstellen</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label className="fs-5" htmlFor="title">Title</label>
                        <div className="input-group">
                            <input type="text" className="form-control" onChange={changeName} value={name} name="name" required={true}/>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-light" onClick={onClose}>Abbrechen</button>
                    <button className="btn btn-danger" onClick={confirmBoard}>Speichern</button>
                </Modal.Footer>
            </Modal>
        );
    }

}