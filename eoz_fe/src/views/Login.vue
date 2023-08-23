<template>
    <input v-model="username" type="text" />
    <input v-model="password" type="text" />
    <button @click="login()" type="submit">Đăng nhập</button>
</template>
<script>
import axios from 'axios';
import VueCookies from 'vue-cookies';

export default {
    data() {
        return {
            username: null,
            password: null,
        };
    },
    methods: {
        login() {
            axios.post(`http://localhost:3000/v1/login`, {
                username: this.username,
                password: this.password,
            })
                .then(response => {
                    console.log(response.data);
                    if (response.data.code) {
                        VueCookies.set('token', response.data.token, "1d");
                        VueCookies.set('role', response.data.role, "1d");
                        if (response.data.role == 'student') {
                            window.location.assign('../student/class')
                        } else window.location.assign('../teacher/classManager')
                    } else alert('Sai tài khoản hoặc mật khẩu');
                })
                .catch(e => {
                    console.log(e);
                })
        }
    }
};
</script>