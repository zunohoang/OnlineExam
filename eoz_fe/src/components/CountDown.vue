<script>
import { store } from '../views/student/endTime';
export default {
    data() {
        return {
            timerCount: this.time
        }
    },
    props: [
        'time'
    ],
    methods: {
        formatTime(time) {
            let minutes = parseInt(time / 60);
            let seconds = time - minutes * 60;
            return minutes + ':' + seconds;
        }
    },
    watch: {
        timerCount: {
            handler(value) {
                if (value > 0) {
                    setTimeout(() => {
                        this.timerCount--;
                    }, 1000);
                };
                if (value == 0) {
                    store.sendAnswer();
                }

            },
            immediate: true // This ensures the watcher is triggered upon creation
        }

    }
}
</script>
<template>
    {{ formatTime(timerCount) }}
</template>