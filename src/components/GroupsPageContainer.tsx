import * as React from 'react';
// import GroupsResponse from './GroupsResponse';
import Response from '../Response/Response';
import Axios, { AxiosResponse } from 'axios';
import GroupCardComponent from './GroupCardComponent'
<<<<<<< HEAD
import { Row, Col, Card } from 'antd'
import WSGroupService from '../services/WSGroupsService';
import { GroupResponse } from "../services/interfaces";
import img from '../images/cs-header.jpg'




export default class GroupPageContainer extends React.Component<any, Response<GroupResponse[]>>{
    private WSGroupService: WSGroupService;
    private sortFlag: boolean = false;
=======
import { Row, Col } from 'antd'
import WSGroupsService from '../services/WSGroupsService';
import {GroupResponse} from "../services/interfaces";
import { GlobalContext, SharedContext } from 'src/models/SharedContext';

export default class GroupPageContainer extends React.Component<any, Response<GroupResponse[]>>{
    private static contextType = GlobalContext;
    private WSGroupService : WSGroupsService;
    private sortFlag : boolean = false;
>>>>>>> f51519bacfa2575da2a649966f4fcd838bd5c626

    constructor(props: any) {
        super(props)
        this.state = { data: [], statuscode: 0, error: "" };
    }

<<<<<<< HEAD
        this.WSGroupService = new WSGroupService();
        this.WSGroupService.registerCallback('groupChanged', this.onGroupChanged);
=======
    public componentWillMount(){
        this.WSGroupService = (this.context as SharedContext).WSGroupsService;
>>>>>>> f51519bacfa2575da2a649966f4fcd838bd5c626
    }

    public componentDidMount() {
        Axios.get('/groups')
            .then((res: AxiosResponse) => {
                this.setState({ data: res.data });
            });
    }

    public render() {
        if (this.state === null) {
            return (<p>Loading</p>);
        }
        else if (this.state.statuscode === 0) {
            const sorted = this.state.data.sort((x, y): any => {
                if (x.maxSize - x.users.length < y.maxSize - y.users.length) {
                    return -1
                }
                if (x.maxSize - x.users.length > y.maxSize - y.users.length) {
                    return 1
                }
                return 0

            });

<<<<<<< HEAD
            const groups = sorted.map((element: GroupResponse) => {
                return (<GroupCardComponent key={element._id} group={element} WSGroupService={this.WSGroupService} onGroupChangeCallback={this.onGroupChanged} />)
            });


=======
            const groups = sorted.map((element : GroupResponse) => {
                return (<GroupCardComponent key={element._id} group={element} onGroupChangeCallback={this.onGroupChanged} />)
            });
>>>>>>> f51519bacfa2575da2a649966f4fcd838bd5c626
            return (
                <div>
                    <Row>
                        <Col span={4} />
                        <Col span={16}>
                            <Card cover={<img src={img} />}>
                                <Row>
                                    <Col span={4} />
                                    <Col span={16}>
                                        {groups}
                                    </Col>
                                    <Col span={4} />
                                </Row>
                            </Card>
                        </Col>
                        <Col span={4} />
                    </Row>
                </div>
            )
        }
        else {
            return (<p>Ooops, no groups!</p>)
        }
    }

    private onGroupChanged = (response: { group: GroupResponse, caller: string }): void => {
        if (!this.sortFlag) { return };

        const oldData = this.state.data;
        const groupIndex = oldData.findIndex((value: GroupResponse, index: number, obj: GroupResponse[]) => {
            return value._id === response.group._id;
        });
        if (groupIndex === -1) {
            oldData.push(response.group);
        }
        else {
            oldData[groupIndex] = response.group;
        }

        this.setState({ data: oldData });
    }
}