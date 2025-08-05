import http from "../utils/http";

const userListApi = {
  async getUserList() {
    return http.get("users/check");
  },

  async getTrashUserList() {
    return http.get("/users/trash");
  },

  async editUser(data) {
    return http.post("users/management/2", data);
  },

  async addUser(data) {
    return http.post("register", data);
  },

  async deleteUser(data) {
    return http.delete("users/management/5", { data });
  },

  async restoreUser(data) {
    return http.post("/users/trash/restore", data);
  },

  async permanentDelete(data) {
    return http.post("users/trash/delete", { data });
  },
};

export default userListApi;
