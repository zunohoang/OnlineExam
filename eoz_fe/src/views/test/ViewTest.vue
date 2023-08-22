<script>
//Call API
const test = {
    "name": "Bài kiểm tra Toán 15p (Lần 1)",
    "timeCreate": "07:00 10/08/2023",
    "timeLimit": "23:59 10/08/2023",
    "numberTake": 0,
    "time": "15 Phút",
    "question": [
        {
            "content": "Hãy cho biết đáp án của phép tính sau: 1 + 1 = ?",
            "key": [
                1,
                2,
                3,
                4
            ]
        },
        {
            "content": "Hãy cho biết đáp án của phép tính sau: 1 + 1 = ?",
            "key": [
                1,
                2,
                3,
                4
            ]
        },
        {
            "content": "Hãy cho biết đáp án của phép tính sau: 1 + 1 = ?",
            "key": [
                1,
                2,
                3,
                4
            ]
        },
        {
            "content": "Hãy cho biết đáp án của phép tính sau: 1 + 1 = ?",
            "key": [
                1,
                2,
                3,
                4
            ]
        }
    ],
}
export default {
    data() {
        return {
            Test: test,
        }
    },
    methods: {

    }
}

</script>
<template>
    <div class="w-full h-full flex justify-center items-center">
        <div class=" text-sky-100 w-1/5 bg-gray-600">
            <h1>{{ Test.name }}</h1>
            <p>Số câu: {{ Test.question.length }}</p>
            <p>Thời gian: {{ Test.time }}</p>
            <p>Sô người đã làm: {{ Test.numberTake }}</p>
            <p>Hạn: {{ Test.timeLimit }}</p>
        </div>
    </div>
</template>