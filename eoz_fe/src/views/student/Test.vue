<script>
import router from '../../router';

export default {
    data() {
        return {
            Test: {
                name: this.$route.query.name,
                numberTake: this.$route.query.numberTake,
                numberQuestion: this.$route.query.numberQuestion,
                timeTake: this.$route.query.timeTake,
                _id: this.$route.params.id
            },
        }
    },
    methods: {
        backTo() {
            router.go(-1);
        },
        takeTest() {
            router.push({
                name: 'take-test',
                params: {
                    id: this.Test._id,
                },
                query: {
                    nameTest: this.$route.query.name,
                    numberTake: this.$route.query.numberTake,
                    numberQuestion: this.$route.query.numberQuestion,
                    timeTake: this.$route.query.timeTake,
                }
            })
        }
    }
}

</script>
<template>
    <div class="w-full h-full">
        <div class="w-full h-full rounded-lg flex flex-col " style="background-color: rgb(255, 255, 255, 0.03);">
            <div class="">
                <button class="cursor-pointer p-5 md:w-auto text-slate-200 flex" @click="backTo()">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                    <p>Back</p>
                </button>
            </div>
            <div class="w-full h-full flex justify-center items-center">
                <div class=" text-sky-100 w-1/2 rounded-md p-5 pt-7" style="background-color: rgb(255, 255, 255, 0.05);">
                    <h1 class="text-center font-sans text-2xl">{{ Test.name }}</h1>
                    <p class="text-center p-3 mt-3">id: {{ Test._id }}</p>
                    <div class="mt-5 font-sans text-lg">
                        <div class="azt-info-exam mt-5">
                            <div class="flex items-center">
                                <p class="text-md flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                        height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 mr-2">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg> Thời gian làm bài </p>
                                <p class="text-md font-medium ml-auto">{{ Test.timeTake }}</p>
                            </div>
                            <div class="flex items-center mt-3">
                                <p class="text-md flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                        height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 mr-2">
                                        <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"></path>
                                        <path d="M16 2v4"></path>
                                        <path d="M8 2v4"></path>
                                        <path d="M3 10h5"></path>
                                        <path d="M17.5 17.5 16 16.25V14"></path>
                                        <path d="M22 16a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z"></path>
                                    </svg> Hạn làm bài thi </p>
                                <p class="text-md font-medium ml-auto"> Cập nhật sau </p>
                            </div>
                            <div class="flex items-center mt-3">
                                <p class="text-md flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                        height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 mr-2">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                                    </svg> Số lượng câu hỏi </p>
                                <p class="text-md font-medium ml-auto"> {{ Test.numberQuestion }} </p>
                            </div>
                            <div class="flex items-center mt-3">
                                <p class="text-md flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                        height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 mr-2">
                                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2">
                                        </path>
                                        <path d="M9 12v-1h6v1"></path>
                                        <path d="M11 17h2"></path>
                                        <path d="M12 11v6"></path>
                                    </svg> Loại đề </p>
                                <p class="text-md font-medium ml-auto"> Trắc nghiệm </p>
                            </div>
                            <div class="flex items-center mt-3">
                                <p class="text-md flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                        height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 mr-2">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="9" cy="7" r="4"></circle>
                                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                    </svg> Số người đã làm </p>
                                <p class="text-md font-medium ml-auto">{{ Test.numberTake }}</p>
                            </div>
                            <div class="mt-5"><button @click="takeTest()"
                                    class="btn btn-pending w-full text-white ng-star-inserted bg-sky-800 p-2 rounded-md">
                                    Bắt đầu làm
                                    bài</button><!----><!----></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>