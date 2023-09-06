<script>
import { routeLocationKey } from 'vue-router';
import router from '../../router';
export default {
    data() {
        return {};
    },
    methods: {
        goTo(x) {
            if (x == 0) {
                router.push({
                    name: 'createTest'
                });
            }
            else if (x == 1) {
                router.push({
                    name: 'room'
                });
            }
            else {
                router.push({
                    name: 'myTest'
                });
            }
        }
    },
    components: { routeLocationKey }
}
</script>
<template>
    <div class="content rounded-lg p-5 flex flex-col">
        <b class="text-slate-200 ml-5 ">Giáo viên: </b>
        <div class="ray w-full border-2 border-gray-500 mt-3"></div>
        <div class="p-5 w-full">
            <button @click="goTo(0)" type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Tạo
                đề thi</button>
            <button @click="goTo(1)" type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Lớp
                của bạn</button>
            <button @click="goTo(2)" type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Đề
                thi</button>
        </div>
        <router-view class="h-full w-full ray p-5 rounded-md"></router-view>
    </div>
</template>
<style>
.ray {
    background-color: rgb(255, 255, 255, 0.05);
}

.content {
    background-color: rgb(255, 255, 255, 0.03);
}
</style>