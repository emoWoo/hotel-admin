import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    userInfo: {},
  }),
  getters: {
    // isLoggedIn: (state) => !!state.token,
  },
  actions: {
    // setUserInfo(userInfo) {
    //   this.userInfo = userInfo;
    // },
    // setToken(token) {
    //   this.token = token;
    // },
    // clearUser() {
    //   this.userInfo = {
    //     id: "",
    //     username: "",
    //     email: "",
    //     phone: "",
    //     role: "",
    //   };
    //   this.token = "";
    // },
  },
});