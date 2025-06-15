import { createApp } from 'vue';
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue';
import App from './App.vue';
import 'ant-design-vue/dist/reset.css';
import VueApexCharts from "vue3-apexcharts";
import router from './route/index.js';
import i18n from './i18n/index.js';
import './assets/style.css'

const pinia = createPinia()
const app = createApp(App);

app.use(pinia)
app.use(Antd)
app.use(VueApexCharts);
app.use(router);
app.use(i18n);
app.mount('#app');