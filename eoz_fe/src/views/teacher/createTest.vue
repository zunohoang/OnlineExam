<script>
import VueCookies from 'vue-cookies';
import axios from 'axios';
export default {
    data() {
        return {
            rooms: [],
            classClick: {},
            selectedFile: "",
        }
    },
    created() {
        this.getClass();
    },
    methods: {
        onFileChange(e) {
            const selectedFile = e.target.files[0]; // accessing file
            this.selectedFile = selectedFile;
        },
        onChange(event) {
            var x = event.target.value;
            if (x == -1) {
                this.classClick = [];
                return;
            }
            this.classClick = this.rooms[x];
        },
        getClass() {
            const TokenUser = {
                headers: {
                    'Authorization': 'Bearer ' + VueCookies.get('token')
                },
            }
            axios.get('http://localhost:3000/v1/getAllClass', TokenUser)
                .then(Response => {
                    this.rooms = Response.data;
                })
                .catch()

        },
        submitData() {
            const TokenUser = {
                headers: {
                    'Authorization': 'Bearer ' + VueCookies.get('token')
                }
            }
            const formData = new FormData();
            formData.append("file", this.selectedFile);  // appending file
            const id = this.classClick._id;
            // sending file to the backend
            axios
                .post("http://localhost:3000/v1/teacher/createTest/" + id, formData, TokenUser)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                });
        },

    }
}
</script>
<template>
    <div class="w-full gray">
        <h1 class="text-slate-200">Tạo bài kiểm tra</h1>
        <br>
        <input type="file" @change="onFileChange" />
        <br><br>
        <select @change="onChange($event)" id="myClass"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected value="-1">Chọn lớp</option>
            <option v-for="(room, index) in rooms" v-bind:value="index">{{ room.name }}</option>
        </select>
        <br>
        <button @click="submitData()" type="button"
            class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Tạo
            đề thi</button>
    </div>
</template>
<style>
.ray {
    background-color: rgb(255, 255, 255, 0.05);
}
</style>