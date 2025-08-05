import http from "../utils/http";

const userApi = {
  async getUserInfo() {
    return http.get("user");
  },

  async updateUserInfo(data) {
    return http.post("user/update", data);
  },
  
};

export default userApi;
