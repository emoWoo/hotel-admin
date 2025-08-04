import http from "../utils/http.js";

const hotelApi = {
  async getHotels() {
    return http.get("hotels/check");
  },

  async getTrashHotels() {
    return http.get("hotels/trash");
  },

  async addHotel(data) {
    console.log("addHotel data", data);
    return http.post("hotels/management", data);
  },

  async editHotel(data) {
    return http.post("hotels/management/2", data);
  },

  async restoreHotel(data) {
    return http.post("hotels/trash/restore", data);
  },

  async softDelete(data) {
    return http.delete("/hotels/management/5", { data });
  },

  async permanentDelete(data) {
    return http.delete("/hotels/trash/delete", { data });
  },
};

export default hotelApi;
