import * as React from 'react';
// import GroupsResponse from './GroupsResponse';
import Response from '../Response/Response';
import Axios, { AxiosResponse } from 'axios';
import GroupCardComponent from './GroupCardComponent'
import { Row, Col } from 'antd'
import IGroup from 'src/models/IGroup';
import WSGroupService from '../services/WSGroupsService';


export default class GroupPageContainer extends React.Component<any, Response<IGroup[]>>{
    private WSGroupService : WSGroupService;
    private sortFlag : boolean = false;
    constructor(props: any) {
        super(props)
        this.state = { data: [], statuscode: 0, error: "" };

        this.WSGroupService = new WSGroupService();
    }

    public componentDidMount() {
        Axios.get('/groups')
            .then((res: AxiosResponse) => {
                this.setState({ data: res.data});
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

            const groups = sorted.map((element : IGroup) => {
                return (<GroupCardComponent key={element._id} group={element} WSGroupService={this.WSGroupService} onGroupChangeCallback={this.onGroupChanged} />)
            });
            
            return (
                <div>
                    <Row>
                        <Col span={8} />
                        <Col span={8}> {groups} </Col>
                        <Col span={8} />
                    </Row>
                </div>
            )
        }
        else {
            return (<p>Ooops, no groups!</p>)
        }
    }

    private onGroupChanged = (group : IGroup) : void =>{
        if(!this.sortFlag) {return};

        const oldData = this.state.data;
        const groupIndex = oldData.findIndex((value : IGroup, index : number, obj : IGroup[]) => {
            return value._id === group._id;
        });
        if(groupIndex === -1){
            oldData.push(group);
        }
        else {
            oldData[groupIndex] = group;
        }
        
        this.setState({data : oldData });
    }
}