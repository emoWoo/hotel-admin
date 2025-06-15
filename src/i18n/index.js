import { createI18n } from "vue-i18n";

import zh_Login from "./zh/login";
import zh_Dashboard from "./zh/dashboard";
import zh_Usrinfo from "./zh/usrinfo";
import zh_User from "./zh/user";
import zh_Hotel from "./zh/hotel";
import zh_Tag from "./zh/tag";
import zh_Deposit from "./zh/deposit";

import en_Login from "./en/login";
import en_Dashboard from "./en/dashboard";
import en_Usrinfo from "./en/usrinfo";
import en_User from "./en/user";
import en_Hotel from "./en/hotel";
import en_Tag from "./en/tag";
import en_Deposit from "./en/deposit";

const messages = {
  zh: {
    login: zh_Login,
    dashboard: zh_Dashboard,
    usrinfo: zh_Usrinfo,
    user: zh_User,
    hotel: zh_Hotel,
    tag: zh_Tag,
    deposit: zh_Deposit,
  },
  en: {
    login: en_Login,
    dashboard: en_Dashboard,
    usrinfo: en_Usrinfo,
    user: en_User,
    hotel: en_Hotel,
    tag: en_Tag,
    deposit: en_Deposit,
  },
};

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem("lang") || "zh", // 设置默认语言
  fallbackLocale: "en", // 设置回退语言
  messages, // 设置语言包
});
export default i18n;
