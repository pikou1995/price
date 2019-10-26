import Vue from "vue";
import App from "./app.vue";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.use(Antd);

const root = document.createElement("div");
document.body.appendChild(root);

new Vue(App).$mount(root);
