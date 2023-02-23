import React from "react";
import Modal from 'react-bootstrap/Modal';
import {Button} from "react-bootstrap";

export default class CreateNoteDialog extends React.Component{

    render() {
        const { open, onClose, content, confirmNote, cancelModal, changeContentState } = this.props;

        return(
            <Modal show={open} onHide={onClose}>
                <Modal.Header>
                    <Modal.Title>Neue Notiz erstellen</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label className="fs-5" htmlFor="title">Title</label>
                        <div className="input-group">
                            <input type="text" className="form-control" onChange={changeContentState} value={content.title} placeholder="Titel" name="title" required={true}/>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="fs-5" htmlFor="text">Inhalt</label>
                        <div className="input-group">
                            <textarea className="form-control" onChange={changeContentState} value={content.text} placeholder="Inhalt" name="text" required={true}/>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="fs-5" htmlFor="startDate">Start Tag</label>
                        <div className="input-group">
                            <input type="date" className="form-control" onChange={changeContentState} placeholder="" name="startDate" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="fs-5" htmlFor="endDate">End Tag</label>
                        <div className="input-group">
                            <input type="date" className="form-control" onChange={changeContentState} placeholder="" name="endDate" />
                        </div>
                    </div>
               </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-light" onClick={cancelModal}>Abbrechen</button>
                    <button className="btn btn-danger" onClick={confirmNote}>Speichern</button>
                </Modal.Footer>
            </Modal>
        )
    }
}