import React from "react";

export default class Register extends React.Component {

    render() {
        return (
            <div>

                <div className="container mt-5 ">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card shadow py-3 px-2">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label className="fs-5" htmlFor="userName">Benutzername</label>
                                        <div className="input-group">
                                            <input type="text" name="userName" className="form-control "
                                                   value={this.props.user.userName || ''}
                                                   onChange={this.props.changeUserData}
                                                   placeholder="Benutzername"/>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="mb-3">
                                            <label className="fs-5" htmlFor="password">Passwort</label>
                                            <div className="input-group">
                                                <input type="password" className="form-control" name="password"
                                                       value={this.props.user.password || ''}
                                                       onChange={this.props.changeUserData}
                                                       placeholder="Password"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="mb-3">
                                            <label className="fs-5" htmlFor="repeatPassword">Passwort wiederholen</label>
                                            <div className="input-group">
                                                <input type="password" className="form-control" name="repeatPassword"
                                                       value={this.props.user.repeatPassword || ''}
                                                       onChange={this.props.changeUserData}
                                                       placeholder="Password wiederholen"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-grid justify-content-center">
                                        <button className="btn btn-danger" onClick={this.props.logIn}><b>Registrieren</b></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    </div>
    )
    }
}