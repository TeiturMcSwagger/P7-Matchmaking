import axios from "axios";

import { GroupService, IGame, PersistedGroup, Group } from "./interfaces";

export class GroupServiceApi implements GroupService {
    public async getGroupById(groupId: string): Promise<PersistedGroup> {
        const result = await axios.get(process.env.REACT_APP_API_URL + `/api/groups/` + groupId);
        return result.data;
    }

    public async getAllGroups(): Promise<PersistedGroup[]> {
        const request = await axios.get(process.env.REACT_APP_API_URL + "/api/groups");
        return request.data;
    }

    public async leaveGroup(groupId: string, userId: string): Promise<PersistedGroup |  boolean> {
        try {
            // Axios Request - Takes a group_id and user_id
            const request = await axios.post(process.env.REACT_APP_API_URL + "/api/groups/leave", {
                "group_id": groupId,
                "user_id": userId
            });
            console.log(request);

            return request.data;
        } catch (error) {
            return false;
        }
    }

    public async joinGroup(groupId: string, userId: string): Promise<PersistedGroup> {
        const response = await axios.post<PersistedGroup>(process.env.REACT_APP_API_URL + "/api/groups/join", {
            group_id: groupId,
            user_id: userId,
        });
        return response.data;
    }

    public async deleteGroup(groupId: string): Promise<Group |  boolean> {
        console.log("true");
        try {
            console.log("PATH:", process.env.REACT_APP_API_URL + "/api/groups/remove");
            const request = await axios.post(process.env.REACT_APP_API_URL + "/api/groups/remove", {
                "group_id": groupId
            });

            console.log(request.data);
            return request.data;
        } catch (error) {
            console.log("Error:", error);
            return false;
        }
    }



    public async createGroup(group: Group): Promise<PersistedGroup> {
        const response = await axios.post(process.env.REACT_APP_API_URL + "/api/groups/create", group);
        return response.data
    }

    public async getGameList(): Promise<IGame[]> {
        const request = await axios.get(process.env.REACT_APP_API_URL + "/api/groups/game");

        const games: IGame[] = [];
        request.data.forEach(game => {
            games.push(game);
        });

        return games;
    }
}
