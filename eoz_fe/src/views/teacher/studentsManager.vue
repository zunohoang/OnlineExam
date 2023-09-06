<script>
import axios from 'axios';
import VueCookies from 'vue-cookies';
import { useRoute } from "vue-router";
export default {
    data() {
        return {
            rooms: []
        }
    },
    created() {
        this.getRoom();
    },
    methods: {
        getRoom() {
            const TokenUser = {
                headers: {
                    'Authorization': 'Bearer ' + VueCookies.get('token')
                },
            }
            const route = useRoute();
            const id = route.params._id;
            axios.get('http://localhost:3000/v1/teacher/getStudent/' + id, TokenUser)
                .then(res => {
                    console.log(res)
                    this.rooms = res.data.nameStudent;
                })
                .catch(error => {
                    console.log(error);
                    this.rooms = [];
                });
        }
    }
}
</script>
<template>
    <div class="h-full">
        <div>
            <button type="button"
                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">+
                Thêm học sinh</button>
        </div>
        <div v-for="room in rooms" class="mt-5 bg-slate-600 p-3 rounded-sm">
            <b class="text-slate-200">{{ room }}</b>
        </div>
    </div>
</template>