<script>
import axios from 'axios';
import VueCookies from 'vue-cookies';
import router from '../../router';
export default {
    data() {
        return {
            rooms: [
                {
                    name: "Test",
                    student: [
                        {
                            sdt: '0932943833',
                            name: 'Nguyễn A B'
                        }
                    ]
                }
            ]
        }
    },
    created() {
        this.getClass();
    },
    methods: {
        getClass() {
            const TokenUser = {
                headers: {
                    'Authorization': 'Bearer ' + VueCookies.get('token')
                }
            }
            axios.get('http://localhost:3000/v1/getAllClass', TokenUser)
                .then(res => {
                    console.log(res);
                    this.rooms = res.data;
                })
                .catch(error => {
                    console.log(error);
                    this.rooms = [];
                });
        },
        goRoom(x) {
            router.push({ name: 'roomid', params: { _id: x } });
        }
    }
}
</script>
<template>
    <div class="w-full h-full overflow-auto">
        <div>
            <button type="button"
                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">+
                Tạo
                thêm lớp</button>
        </div>
        <div v-for="room in rooms" @click="goRoom(room._id)" class="mt-5 bg-slate-600 p-3 rounded-sm">
            <b class="text-slate-200">Lớp {{ room.name }}</b>
            <p class="text-slate-100">Thành viên: {{ room.student.length }}</p>
            <p class="text-slate-100">Thông tin: ...</p>
        </div>
    </div>
</template>
<style></style>