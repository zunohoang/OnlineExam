import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.js'
import HelloWorld from './components/HelloWorld.vue';
import Form from './components/Form.vue';
import SideBar from './components/SideBar.vue';
import CountDown from './components/CountDown.vue';

const app = createApp(App);

// compoment
app.component('HelloWorld', HelloWorld);
app.component('Form', Form);
app.component('SideBar', SideBar);
app.component('CountDown', CountDown);

// router and export app
app.use(router).mount('#app')
