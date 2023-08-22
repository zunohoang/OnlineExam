<script>
import { ref } from 'vue'
import { store } from './endTime.js'
import axios from 'axios'
import VueCookies from 'vue-cookies';
import router from '../../router';
import { useRoute } from "vue-router";

/*var id = this.$route.params.id;
        const TokenUser = {
            headers: {
                'Authorization': 'Bearer ' + VueCookies.get('token')
            },
        }
        axios.get('http://localhost:3000/v1/getTest/' + id, TokenUser)
            .then(res => {
                console.log(res)
                Test = res.data;
            })
            .catch(error => {
                console.log(error);
                Test = {}
var keyx = [];
        var res = [];
        for (var i = 0; i < this.Question.length; i++) {
            keyx.push([false, false, false, false]);
        }
            });*/
export default {
    setup() {
        const route = useRoute();
        var id = route.params.id;
        store.answerJson._id = id;

    },
    data() {

        return {
            Questions: [],
            timerCount: this.$route.query.timeTake * 60,
            key: [],
            res: []
            // anwerJson
        }
    },
    created() {
        this.getTest()
    },
    methods: {
        getTest: function () {
            const route = useRoute();
            var id = route.params.id;
            const TokenUser = {
                headers: {
                    'Authorization': 'Bearer ' + VueCookies.get('token')
                },
            }
            axios.get('http://localhost:3000/v1/getTest/' + id, TokenUser)
                .then(res => {
                    console.log(res)
                    this.Questions = res.data.test[0].question;
                    var keyx = [];
                    for (var i = 0; i < this.Questions.length; i++) {
                        keyx.push([false, false, false, false]);
                    }
                    this.key = keyx;
                })
                .catch(error => {
                    console.log(error);
                    this.Questions = {}
                });
        },
        saveAns(index, idkey) {
            this.res[index] = idkey;
            for (let i = 0; i <= 3; i++) this.key[index][i] = false;
            this.key[index][idkey] = true;
            store.answerJson.key[index] = idkey;
        },
        sendAnswer: () => store.sendAnswer()
    },
}
</script>
<style>
.clickClass {
    border-width: 3px;
    border-color: rgb(46, 65, 59);
}
</style>
<template>
    <div class="flex h-full w-full" style="background-color: rgb(246, 243, 246);">
        <div class="grow flex flex-col">
            <div class="flex bg-slate-50 items-center p-3" style="height: 7%;">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
                    role="img" class="mr-5 iconify iconify--logos" width="37.07" height="36"
                    preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 198">
                    <path fill="#41B883" d="M204.8 0H256L128 220.8L0 0h97.92L128 51.2L157.44 0h47.36Z"></path>
                    <path fill="#41B883" d="m0 0l128 220.8L256 0h-51.2L128 132.48L50.56 0H0Z"></path>
                    <path fill="#35495E" d="M50.56 0L128 133.12L204.8 0h-47.36L128 51.2L97.92 0H50.56Z"></path>
                </svg>
                <b class="text-center font-sans text-lg">12A2Toan - Bài Kiểm Tra 15 Phút Môn Toán</b>
            </div>
            <div class="grow p-1 w-full h-full overflow-auto snap-y">
                <div class="h-full ml-[5%] w-[95%] ">
                    <div v-for="(question, index) in    Questions   "
                        class=" bg-slate-50 rounded-xl p-5 w-[95%] mb-5 border-solid border-2 border-gray-100">
                        <div class="flex">
                            <div class="mr-2 text-sm rounded-full h-6 w-6 bg-gray-300 border-2 text-center text-white">
                                {{ index + 1 }}
                            </div>
                            <p class="">{{ question.content }}</p>
                            <p>{{ question.key }}</p>
                        </div>
                        <div class="mt-5 w-full border-2 border-gray-200"></div>
                        <div class="flex items-center p-2 ng-star-inserted mt-2">
                            <div class="text-md font-medium mr-5 ng-star-inserted"><span>Đáp án của bạn:</span></div><!---->
                            <div class="list-answer">
                                <button @click="saveAns(index, 0)" id="resA" :class="{ clickClass: key[index][0] }"
                                    class="w-8 h-8 bg-slate-400 rounded-full mr-2">
                                    A </button>
                                <button @click="saveAns(index, 1)" id="resB" :class="{ clickClass: key[index][1] }"
                                    class="w-8 h-8 bg-slate-400 rounded-full mr-2">
                                    B </button>
                                <button @click="saveAns(index, 2)" id="resC" :class="{ clickClass: key[index][2] }"
                                    class="w-8 h-8 bg-slate-400 rounded-full mr-2">
                                    C </button>
                                <button @click="saveAns(index, 3)" id="resD" :class="{ clickClass: key[index][3] }"
                                    class="w-8 h-8 bg-slate-400 rounded-full mr-2">
                                    D </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class=" bg-slate-50" style="height: 2%;"></div>
        </div>
        <div class="flex-none bg-slate-50 p-6 " style="width: 30%;">
            <div class="mb-5 flex-none">
                <p class="mb-3"><b>Thông tin thí sinh:</b></p>
                <div class="flex">
                    <p class="ml-3 mb-1 grow">Mã học sinh: </p>
                    <p>3925803928590</p>
                </div>
                <div class="flex">
                    <p class="ml-3 grow">Mã bài thi: </p>
                    <p>439054859438590</p>
                </div>
            </div>
            <div class="flex items-center bg-slate-50 border-solid border-2 border-gray-100 rounded-md p-2">
                <div class="grow ">
                    <p>Thời gian còn lại</p>
                </div>
                <div class="flex items-center">
                    <div>
                        <b class="text-xl p-2">
                            <CountDown :time="timerCount" />
                        </b>
                    </div>
                    <button @click="sendAnswer()" class="text-white rounded p-2 bg-cyan-700">Nộp bài</button>
                </div>
            </div>
            <div class="mt-4 h-3/5">
                <div class="flex h-10 items-center">
                    <div class="items-center">
                        <p>Chỉ thị màu sắc:</p>
                    </div>
                    <div class="rounded-full h-6 w-6 bg-gray-300 border-2 ml-1 tems-center text-white">

                    </div>
                    <div class="rounded-full h-6 w-6 bg-cyan-600 border-2 ml-1 tems-center text-white">

                    </div>
                    <div class="rounded-full h-6 w-6 bg-gray-300 border-2 border-rose-500 ml-1 tems-center text-white">

                    </div>
                </div>
                <div class="mt-5">
                    <div class="grid grid-cols-7 gap-5 w-4/5">
                        <div v-for="(question, index) in Questions"
                            class=" text-sm rounded-full h-6 w-6 bg-gray-300 border-2 text-center text-white">
                            {{ index + 1 }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="">
                <div class="border-2 border-gray-300 rounded-md"></div>
                <div class="flex">
                    <p class="grow">Bạn đã hoàn thành</p>
                    <p>1/10 Câu</p>
                </div>
                <div class="flex items-center mb-5">
                    <div class=" w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-300">
                        <div class="bg-cyan-700 h-1.5 rounded-full" style="width: 10%"></div>
                    </div>
                    <p class="ml-3">10%</p>
                </div>
                <div class="border-2 border-gray-300 rounded-md"></div>
                <p class="text-green-500">Tình trạng Internet: OK</p>
            </div>
        </div>
    </div>
</template>