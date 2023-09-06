<script setup>
import Siderbar from '../../components/SideBar.vue';

</script>
<template>
    <div class="flex w-screen h-screen">
        <!-- <Siderbar class="flex-none w-16" /> -->
        <div class="grow p-10">
            <router-view class="h-full w-full"></router-view>
        </div>
    </div>
</template>
