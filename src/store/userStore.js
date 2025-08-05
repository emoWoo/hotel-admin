import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    userInfo: {},
    groupOptions:[
      {
        label:"管理员",
        value:"admin"
      }
    ],
    statusOptions:[
      {
        label:"活跃",
        value:1
      },
      {
        label:"禁用",
        value:0
      }
    ]

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