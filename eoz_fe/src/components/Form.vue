<template>
    <form v-on:submit.prevent="create">
        <input type="text" v-model="formdata" placeholder="Name" />
        <button type="submit">add</button>
        <h1>{{ mess }}</h1>
    </form>
</template>

<script>
export default {
    data() {
        return {
            formdata: '',
            mess: '',
        }
    },
    methods: {
        create() {
            console.log(this.formdata);
            this.mess = 'test';
        }
    }
}
</script>