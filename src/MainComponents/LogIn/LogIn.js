import React from "react";

export default class LogIn extends React.Component {

    render() {
        return (
            <div className="container mt-5 ">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow py-3 px-2">
                            <div className="card-body">
                                <div className="mb-3">
                                    {this.props.logInWarning && <p className="text-danger">Password oder Benutzername stimmen nicht</p>}
                                    <label className="fs-5" htmlFor="userName">Benutzername</label>
                                    <div className="input-group">
                                        <input name="userName" type="text" className="form-control"
                                        value={this.props.user.userName || ''} onChange={this.props.changeUserData}
                                        placeholder="Benutzername" />
                                    </div>
                                </div>
                                <div className="">
                                    <div className="mb-3">
                                        <label className="fs-5" htmlFor="password">Passwort</label>
                                        <div className="input-group">
                                            <input type="password" className="form-control" name="password"
                                                   value={this.props.user.password || ''} onChange={this.props.changeUserData}
                                                   placeholder="Password" />
                                        </div>
                                    </div>
                                </div>
                                <div className="d-grid justify-content-center">
                                    <button className="btn btn-danger" onClick={this.props.logIn}><b>Login</b></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}