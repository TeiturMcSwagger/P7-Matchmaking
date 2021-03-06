import * as React from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { GlobalContext, SharedContext } from "../models/SharedContext";
import { Button } from 'antd';
import { UserService } from '../services/interfaces'
import { User } from 'src/models/User';

export class MenuBar extends React.Component<RouteComponentProps> {
    // THIS VARIABLE *IS* IN FACT USED! DO NOT REMOVE!!!

    private static contextType = GlobalContext;
    private user: User;






    public componentWillMount() {
        this.user = (this.context as SharedContext).UserService.getUserInfo();
    }
    public render() {

        let myGroupButton;
        if (this.user.groupId !== "") {
            myGroupButton = <Button type={"primary"} size={"large"} onClick={this.handleMyGroupClicked}> My Group </Button >
        }


        return (
            <header className="App-header">
                <GlobalContext.Consumer>
                    {(context: SharedContext) => (
                        <div id="wrap">
                            <div id="item">
                                <h1 onClick={() => this.props.history.push("/")}>F-LAN Matchmaking</h1>
                                <div id="wrap">
                                    <div id="item"><p><b>UserID:</b> {context.User.userId} - </p></div>
                                    <div id="item"><p><b>DiscordID:</b> {context.User.discordId} - </p></div>
                                    <div id="item"><p><b>Name:</b> {context.User.name}</p></div>
                                </div>
                            </div>
                            <div id="menuitem">
                                <div id="wrap">


                                    <div id="button">                                    
                                        <Button hidden={this.context.User.groupId === ""} type={"primary"} size={"large"} onClick={this.handleMyGroupClicked}> My Group </Button >
                                    </div>


                                    <div id="button">
                                        <Button.Group size={"large"}>
                                            <Button onClick={() => this.props.history.push("/")} ghost={true}>Home</Button>
                                            <Button onClick={() => this.props.history.push("/groups")} ghost={true}>Groups</Button>
                                            <Button onClick={() => this.props.history.push("/create")} ghost={true}>Create a group</Button>
                                        </Button.Group>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </GlobalContext.Consumer>
            </header>
        );
    }
    private handleMyGroupClicked = () => {
        this.props.history.push('/groups/' + this.context.User.groupId);
    };
}

export default withRouter(MenuBar);