import http from "../utils/http";

const userApi = {
  async getUserInfo() {
    return http.get("admin/user");
  },

  async updateUserInfo(data) {
    return http.post("admin/user", data);
  },
  
};

export default userApi;
