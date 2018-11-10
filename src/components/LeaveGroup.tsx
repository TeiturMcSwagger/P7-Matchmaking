import * as React from 'react';
import { LeaveBtn } from '../UI'
import { User } from 'src/models/User';
import { RouteComponentProps, withRouter } from 'react-router';
import { GlobalContext, SharedContext } from 'src/models/SharedContext';
import WSGroupsService from '../services/WSGroupsService';
import { UserServiceCookies } from 'src/services/userServiceCookies';
import { GroupService, GroupResponse, IGroup } from "../services/interfaces";
import { GroupServiceApi } from 'src/services/groupServiceApi';
import { toast } from 'react-toastify';




// Interface for States
// The groupId is saved to state
interface GroupStates {
    groupId: string,
    message: string
}

interface Props {
    groupService : GroupServiceApi
}

// interface GroupProps {
//     groupService: GroupService,
//     userService: UserService,
// }

class LeaveGroup extends React.Component<RouteComponentProps & Props, GroupStates> {
    // This is the Axios link to the backend, for leave group functionality   and userService  
    private groupId: string;
    private userId: string;
    private WSGroupsService: WSGroupsService;
    private UserService: UserServiceCookies;
    // THIS VARIABLE *IS* IN FACT USED! DO NOT REMOVE!!!
    private static contextType = GlobalContext;

    constructor(props : RouteComponentProps & Props) {
        super(props);

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    public componentWillMount() {
        this.WSGroupsService = (this.context as SharedContext).WSGroupsService;
        this.UserService = (this.context as SharedContext).UserService;
        // Set properties based on cookies
        this.groupId = this.UserService.getUserInfo().groupId;
        this.userId = this.UserService.getUserInfo().userId;

        // Initial State
        this.state = {
            groupId: this.groupId,
            message: ""
        };
    }

    // When the leave button is clicked
    public handleOnClick = async () => {
        try {
            // Make the leave group request
            await this.WSGroupsService.leaveGroup(this.state.groupId, this.userId, async (error: boolean) => {
                // Update state, if the request was successfull
                if (!error) {
                    const response : IGroup | boolean = await this.props.groupService.getGroupById(this.groupId);  

                    if(response !== false){
                        const group : IGroup = response as IGroup;
                        
                        if(group.users.length < 1){
                            this.props.groupService.deleteGroup(this.groupId);
                        }
                    }

                    this.UserService.updateGroupIdUserInfo("");
                    
                    this.setState({ groupId: "" });
                    this.setState({ message: "Succesfully left the group" });
                    this.props.history.push("/");
                } else {
                    this.setState({ groupId: "Error" });
                    this.setState({ message: "You are not in a group" });
                }
            });
        }
        catch (error) {
            this.setState({ message: "Group was not changed" })
        }
        const user = this.UserService.getUserInfo();
        user.groupId = "";
        this.UserService.setUserInfo(user);
    }

    // Simple Rendering, self explanatory
    public render() {
        return (
            <div className="LeaveGroupComponent">
                <LeaveBtn onClick={this.handleOnClick}>Leave group</LeaveBtn>
            </div>
        );
    }
}

export default withRouter(LeaveGroup);