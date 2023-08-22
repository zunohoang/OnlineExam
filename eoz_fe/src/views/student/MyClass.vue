<script>
import { VueElement, ref } from 'vue';
import axios from 'axios';
import VueCookies from 'vue-cookies';
import router from '../../router';
export default {
    data() {
        return {
            rooms: [],
            Tests: [],
            count: 0,
        };
    },
    created() {
        this.getClass();
    },
    methods: {
        getClass: function () {
            const TokenUser = {
                headers: {
                    'Authorization': 'Bearer ' + VueCookies.get('token')
                }
            }
            axios.get('http://localhost:3000/v1/getAllClass', TokenUser)
                .then(res => {
                    this.rooms = res.data;
                })
                .catch(error => {
                    console.log(error);
                    this.rooms = [];
                });
        },
        gotoUrl: function (x, y, z, t, q) {
            router.push({
                name: 'testid',
                params: {
                    id: x,
                },
                query: {
                    name: y,
                    numberTake: z,
                    numberQuestion: t,
                    timeTake: q,
                }
            })
        },
        onChange: function (event) {
            var x = event.target.value;
            if (x == -1) {
                this.Tests = [];
                return;
            }
            this.Tests = this.rooms[x].test;
        }
    }
}
</script>
<template>
    <div class="content rounded-lg flex p-5">
        <div class="flex-none w-[20%] p-2">
            <h1 class="text-slate-100 mb-2">My Class:</h1>
            <div class="p-1">
                <select @change="onChange($event)" id="countries"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected value="-1">Chọn lớp</option>
                    <option v-for="(room, index) in rooms" v-bind:value="index">{{ room.name }}</option>
                </select>
            </div>
            <div class="mt-5">
                <button type="button"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Thêm
                    lớp mới</button>
            </div>
        </div>
        <div class="grow p-5 h-full">
            <div class="testall h-full rounded-md">
                <div class="p-5 snap-y h-full overflow-auto">
                    <div v-if="Tests.length == 0">
                        <h1 class="text-slate-100">Vui lòng chọn lớp học</h1>
                    </div>
                    <div v-for="(test, index) in  Tests ">
                        <div @click="gotoUrl(test._id, test.name, test.numberTake, test.numberQuestion, test.timeTake)"
                            class=" rounded flex snap-start mt-3" style="background-color:rgb(255, 255, 255,0.1);">
                            <div class="flex-none p-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="w-16 h-16 text-slate-100">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>
                            </div>
                            <div class="grow p-2">
                                <h2 class="text-slate-100">{{ test.name }}</h2>
                                <p class="text-slate-500">Số người đã làm: {{ test.numberTake }}</p>
                                <p class="text-slate-500">Trạng thái: Chưa làm</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
