<script>
import axios from 'axios';
import VueCookies from 'vue-cookies';
import { useRoute } from "vue-router";
export default {
    data() {
        return {
            data: {}
        }
    },
    created() {
        this.getPoint();
    },
    methods: {
        getPoint() {
            const route = useRoute();
            var id = route.params.id;
            const TokenUser = {
                headers: {
                    'Authorization': 'Bearer ' + VueCookies.get('token')
                },
            }
            axios.get('http://localhost:3000/v1/getPoint/' + id, TokenUser)
                .then(Response => {
                    console.log(Response)
                    this.data = Response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
}
</script>
<template>
    <div class="content rounded-lg p-5 text-slate-200">
        <p>Tên bài kiểm tra: {{ data.name }}</p>
        <p>id: {{ data.id }}</p>
        <p v-for="point in data.Points">Điểm số: {{ point.point }} . </p>
        <p>Chi tết bài thi: Chức năng sẽ được cập nhật sau</p>
    </div>
</template>
<style>
.testall {
    background-color: rgb(255, 255, 255, 0.05);
}

.content {
    background-color: rgb(255, 255, 255, 0.03);
}
</style>