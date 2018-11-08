import * as React from "react";
import Response from '../Response/Response';
import { Button, Card } from 'antd'
import WSGroupsService from 'src/services/WSGroupsService';
import { GroupResponse } from 'src/services/interfaces';
// import { UserServiceCookies } from "src/services/userServiceCookies";
import { RouteComponentProps, withRouter } from "react-router";
import { SharedContext, GlobalContext } from 'src/models/SharedContext';


class GroupCardComponent extends React.Component<
    RouteComponentProps & {
        group: GroupResponse,
<<<<<<< HEAD
        WSGroupService: WSGroupService,
        onGroupChangeCallback: (response: { group: GroupResponse, caller: string }) => void
=======
        onGroupChangeCallback: (group: GroupResponse) => void
>>>>>>> f51519bacfa2575da2a649966f4fcd838bd5c626
    },
    Response<GroupResponse>
    >{
    private static contextType = GlobalContext;
    private WSGroupsService : WSGroupsService;

    constructor(props:
        RouteComponentProps & {
            group: GroupResponse,
<<<<<<< HEAD
            WSGroupService: WSGroupService,
            onGroupChangeCallback: (response: { group: GroupResponse, caller: string }) => void
=======
            onGroupChangeCallback: (group: GroupResponse) => void
>>>>>>> f51519bacfa2575da2a649966f4fcd838bd5c626
        }) {
        super(props);
    
        this.state = { data: props.group, error: "", statuscode: 0 };
        console.log("Name: " + props.group.name + " -- State: " + JSON.stringify(this.state) + " -- Props (group): " + JSON.stringify(this.props.group));
    }

    public componentWillMount(){
        this.WSGroupsService = (this.context as SharedContext).WSGroupsService;
        this.WSGroupsService.registerEventHandler('groupChanged', this.onGroupChanged);
    }
    
    public render() {
        const disableJoinButton = this.state.data.maxSize > this.state.data.users.length ? false : true;
<<<<<<< HEAD
        if (disableJoinButton || this.state.data.visible === false) {
=======
        if (disableJoinButton) {
>>>>>>> f51519bacfa2575da2a649966f4fcd838bd5c626
            // Don't render the card if the group is full
            return null;
        }
        const availableSlots = this.state.data.maxSize - this.state.data.users.length;
        return (
<<<<<<< HEAD

            <Card
                title={'Group name: ' + this.state.data.name}
                extra={
                    <Button
                        disabled={disableJoinButton}
                        type='primary'
                        icon="usergroup-add"
                        onClick={this.joinGroup.bind(this)}>
                        Join
                        </Button>
                }
                style={{ width: '100%' }}>
                <p>Available slots: {availableSlots}</p>
                <p><b>Users in this group:</b></p>
                {this.state.data.users.length !== 0 ? (
                    <ul>
                        {this.state.data.users.map((userid: string) =>
                            <li key={userid}>{userid}</li>
                        )}
                    </ul>
                ) : (
                        <li>No users in this group!</li>
                    )}
            </Card>

        );
    }

    private redir = (group: GroupResponse) => {

        this.props.history.push(`/groups/${group._id}`);
    }

    private onGroupChanged = (response: { group: GroupResponse, caller: string }) => {
        // Each time a group is changed, this method is invoked *on all GroupCardComponents*
        // As such, we need to check the ID of the group being changed and only update the state
        // if the group being changed is *this* group
        if (response.group._id !== this.state.data._id) {
=======
            <GlobalContext.Consumer>
                {context => (
                    <div style={{ paddingTop: 10, paddingBottom: 10 }}>
                        <Card
                            title={'Group name: ' + this.state.data.name}
                            extra={
                                <Button
                                    disabled={disableJoinButton}
                                    type='primary'
                                    icon="usergroup-add"
                                    onClick={() => this.joinGroup(context.User.userId)}>
                                    Join
                        </Button>
                            }
                            style={{ width: '100%' }}>
                            <p>Available slots: {availableSlots}</p>
                            <p><b>Users in this group:</b></p>
                            {this.state.data.users.length !== 0 ? (
                                <ul>
                                    {this.state.data.users.map((userid: string) =>
                                        <li key={userid}>{userid}</li>
                                    )}
                                </ul>
                            ) : (
                                    <li>No users in this group!</li>
                                )}
                        </Card>
                    </div>
                )}
            </GlobalContext.Consumer>
        );
    }

    private onGroupChanged = (group: GroupResponse) => {
        // Each time a group is changed, this method is invoked *on all GroupCardComponents*
        // As such, we need to check the ID of the group being changed and only update the state
        // if the group being changed is *this* group
        if (group._id !== this.state.data._id) {
>>>>>>> f51519bacfa2575da2a649966f4fcd838bd5c626
            return;
        }

        /*
            TEST FOR ERRORS IN THE REPONSE HERE!
        */

        // handle the change
<<<<<<< HEAD
        this.setState({ data: response.group });
        // 
=======
        this.setState({ data: group });

        this.props.history.push(`/groups/${group._id}`);
>>>>>>> f51519bacfa2575da2a649966f4fcd838bd5c626

        // Inform the parent of changes
        this.props.onGroupChangeCallback(response);

    }

<<<<<<< HEAD
    private async joinGroup() {
        await this.props.WSGroupService.joinGroup(
            this.state.data._id,
            new UserServiceCookies().getUserInfo().userId,
            this.redir

=======
    private async joinGroup(userId : string) {
        await this.WSGroupsService.joinGroup(
            this.state.data._id,
            userId,
            this.onGroupChanged
>>>>>>> f51519bacfa2575da2a649966f4fcd838bd5c626
        );
    }
}

//   private joinGroup = async () => {
//     try {
//       const groupId = this.state.data._id;
//       const response = await Axios.post("/groups/join", {
//         group_id: groupId,
//         user_id: new UserServiceCookies().getUserInfo().userId,
//       });
//       console.log("Join Response:", response);
//       this.props.history.push(`/groups/${groupId}`);
//     } catch (error) {
//       console.error(error);
//     }
//   }
// }

export default withRouter(GroupCardComponent);
