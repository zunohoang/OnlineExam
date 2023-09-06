<script>
import { RouterView } from 'vue-router';
import router from '../../router';
export default {
    data() {
        return {};
    },
    methods: {
        goTo(x) {
            router.push({
                name: x
            });
        }
    },
    components: { RouterView }
}
</script>
<template>
    <div class="flex flex-col">
        <div class="flex">
            <button @click="goTo('students')" type="button"
                class="h-10 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Thành
                viên</button>
            <button @click="goTo('tests')" type="button"
                class="h-10 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Bài
                kiểm tra</button>
        </div>
        <div class="p-3 bg-gray-800 h-full rounded-sm">
            <router-view class="h-full"></router-view>
        </div>
    </div>
</template>