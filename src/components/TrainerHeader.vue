<template>
    <div>
        <div id="header">
        <span>FITNESS ON</span>
        <button id="HomeBtn" v-on:click="home">Home</button>
        <button id="LogOutBtn" v-on:click.prevent="logout">Logout</button>
</div>
    </div>
</template>


<script>
import "@/assets/css/header.css"
export default {
    name: "AppHeader",
    components: {},
    data() {
        return {};
    },
    methods: {
        logout(){
            console.log("로그아웃");
            this.$store.commit("setAuthUser", null);
            this.$store.commit("setToken", null);
            this.$router.push("/trainer/login");
        },
        home(){
            this.$router.push("/trainer/main");
        }
    },
    created(){}
};
</script>


<style></style>
