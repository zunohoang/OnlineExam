<script>
export default {
    data() {
        return {
            tests: []
        }
    },
    created() {
        this.getTests
    },
    methods: {
        getTests() {
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
                bài kiểm tra</button>
        </div>
        <div v-for="test in tests" @click="goRoom(test._id)" class="mt-5 bg-slate-600 p-3 rounded-sm">
            <b class="text-slate-200">=Tên {{ test.name }}</b>
            <p class="text-slate-100">Thời gian: {{ test.timeCreate }}</p>
            <p class="text-slate-100">Số lượt làm: {{ test.numberTake }}</p>
        </div>
    </div>
</template>