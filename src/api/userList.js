import { de } from "element-plus/es/locales.mjs";
import http from "../utils/http";

const userListApi = {
  async getUserList(params) {
    return http.get("admin/users", { params });
  },
  async getUserDetail(id) {
    return http.get(`admin/users/${id}`);
  },
  async submitUser(id,data){
    return http.post(id ? `admin/users/${id}` : 'admin/users',data);
  },
  async deleteUser(id,params){
    return http.delete(`admin/users/${id}`, { params });
  },
  async restoreUser(id,params){
    return http.patch(`admin/users/${id}`, { params });
  }
};

export default userListApi;