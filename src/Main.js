import React from "react";
import LogIn from "./MainComponents/LogIn/LogIn";
import Register from "./MainComponents/LogIn/Register";
import BoardsView from "./MainComponents/BoardsView";
import MainView from "./MainComponents/MainView";

export default class Main extends React.Component {

    state = {
        clicked: false,
        boardId: 0,
        boardName: "",
    }

    changeClicked = (boardId, boardName) => {
        this.setState({
            clicked: true,
            boardId: boardId,
            boardName: boardName
        })
    }

    changeClickedFalse = () => {
        this.setState(
            {
                clicked: false,
                boardId: 0,
                boardName: "",
            }
        )
    }

    render() {
        return (
            <div>
                {((!this.props.loggedIn && !this.props.register) &&
                    <LogIn logInWarning={this.props.logInWarning} changeUserData={this.props.changeUserData} logIn={this.props.logIn}
                           user={this.props.user}/>)}
                {(!this.props.loggedIn && this.props.register) &&
                    <Register user={this.props.user} handleRegister={this.props.handleRegister}
                              changeUserData={this.props.changeUserData}/>}
                {!this.state.clicked && this.props.loggedIn &&
                    <BoardsView changeClicked={this.changeClicked} user={this.props.user}/>}
                {this.state.clicked && this.props.loggedIn &&
                    <MainView boardId={this.state.boardId} changeClickedFalse={this.changeClickedFalse} boardName={this.state.boardName}/>}
            </div>)
    }
}