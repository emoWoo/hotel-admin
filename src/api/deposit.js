import http from "../utils/http";

const depositApi = {
  async getDepositList() {
    return http.get("lists/check");
  },
};

export default depositApi;