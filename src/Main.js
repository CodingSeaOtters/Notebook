import React from "react";
import LogIn from "./MainComponents/LogIn/LogIn";
import Register from "./MainComponents/LogIn/Register";
import BoardsView from "./MainComponents/BoardsView";

export default class Main extends React.Component {

    state = {
        clicked: false,
        boardId: 0,
    }

    changeClicked = (boardId) => {
        this.setState({
            clicked: true,
            boardId: boardId
        })
    }

    render() {
        return (
            <div>{((!this.props.loggedIn && !this.props.register) &&
                <LogIn changeUserData={this.props.changeUserData} logIn={this.props.logIn} user={this.props.user}/>)}
                {(!this.props.loggedIn && this.props.register) &&
                    <Register user={this.props.user} handleRegister={this.props.handleRegister}
                              changeUserData={this.props.changeUserData}/>}
                {!this.state.clicked && this.props.loggedIn &&
                    <BoardsView changeClicked={ this.changeClicked} user={this.props.user}/>}
                {this.state.clicked && this.props.loggedIn && <MainView boardId={this.state.boardId}/>}
            </div>)
    }
}