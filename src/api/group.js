import http from "../utils/http";

const groupApi ={
    async getGroups(){
        return http.get("admin/user_groups");
    }
}

export default groupApi;