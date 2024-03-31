<template>
    <div>
        <div>
            <div id="header" class="clearfix">
                <h1>
                    <router-link to="/">GYM</router-link>
                </h1>

                <ul v-if="this.$store.state.authUser != null">
                    <li>{{this.$store.state.authUser.name}} 님 안녕하세요^^</li>
                    <li><button v-on:click="logout" type="button" class="btn_s">로그아웃</button></li>
                    <li><router-link class="btn_s" to="/user/modifyform">회원정보수정</router-link></li>
                    <li>{{this.$store.state.authUser.name}} 님의 회원권 만료일은 {{ overDay }}입니다.</li>
                </ul>
        
                <ul v-if="this.$store.state.authUser == null">
                    <li><router-link class="btn_s" to="/member/login">로그인</router-link></li>
                    <li><router-link class="btn_s" to="/member/join">회원가입</router-link></li>
                </ul>
            </div>
            
            <div id="nav">
                <ul class="clearfix">
                    <li><router-link to="">강사소개/PT등록</router-link></li>
                    <li><router-link to="/gym/register">회원권 등록</router-link></li>
                    <li><router-link to="">회원관리</router-link></li>
                    <li><router-link to="">출석</router-link></li>
                </ul>
            </div>

            <div>
                <p>입실/퇴실 시스템</p>
                <span v-if="isNotHere"><button id="enterButton" v-on:click.prevent="entry">입실</button></span>
                <span v-if="isHere"><button id="exitButton" v-on:click.prevent="leave">퇴실</button></span>
                <p>오늘 운동 시간은 {{ trainingTime }}</p>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: "MainView",
    components: {},
   data() {
        return {
            overDay: "",
            isHere: false,
            isNotHere: true,
            trainingTime: ""
        };
    },
    methods: {
        logout(){
            console.log("로그아웃");
            this.$store.commit("setAuthUser", null);
            this.$store.commit("setToken", null);
        },
        membershipOverDay(){
            console.log("overDay");
            axios({
                method: 'get', // put, post, delete
                url: 'http://localhost:9000/api/general',
                headers: { "Content-Type": "application/json; charset=utf-8" 
                            , "Authorization": "Bearer " + this.$store.state.token
                }, //전송타입 + 토큰

                //params: userVo, //get방식 파라미터로 값이 전달
                //data: this.generalVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response.data); //수신데이타
                if(response.data.result == "success"){
                    console.log("result: success");
                    this.overDay = response.data.apiData;
                } else {
                    console.log(response.data.message);
                    
                }

            }).catch(error => {
                console.log(error);
            });
        },
        entry(){
            console.log("entry");
            axios({
                method: 'put', // put, post, delete
                url: 'http://localhost:9000/api/general/start',
                headers: { "Content-Type": "application/json; charset=utf-8" 
                            , "Authorization": "Bearer " + this.$store.state.token
                }, //전송타입 + 토큰

                //params: userVo, //get방식 파라미터로 값이 전달
                //data: this.generalVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response.data); //수신데이타
                if(response.data.result == "success"){
                    console.log("result: success");
                    this.isHere = true;
                    this.isNotHere = false;
                } else {
                    console.log(response.data.message);
                    
                }

            }).catch(error => {
                console.log(error);
            });
        },
        leave(){
            console.log("leave");
            axios({
                method: 'put', // put, post, delete
                url: 'http://localhost:9000/api/general/end',
                headers: { "Content-Type": "application/json; charset=utf-8" 
                            , "Authorization": "Bearer " + this.$store.state.token
                }, //전송타입 + 토큰

                //params: userVo, //get방식 파라미터로 값이 전달
                //data: this.generalVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response.data); //수신데이타
                if(response.data.result == "success"){
                    console.log("result: success");
                    this.isHere = false;
                    this.isNotHere = true;
                } else {
                    console.log(response.data.message);
                    
                }

            }).catch(error => {
                console.log(error);
            });
        },
        training(){
            console.log("training");
            axios({
                method: 'get', // put, post, delete
                url: 'http://localhost:9000/api/general/end',
                headers: { "Content-Type": "application/json; charset=utf-8" 
                            , "Authorization": "Bearer " + this.$store.state.token
                }, //전송타입 + 토큰

                //params: userVo, //get방식 파라미터로 값이 전달
                //data: this.generalVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response.data); //수신데이타
                if(response.data.result == "success"){
                    console.log("result: success");
                    console.log(response.data);
                    if(response.data.apiData >"0"){
                        this.trainingTime = response.data.apiData;
                    } else {
                        this.trainingTime = "0입니다";
                    }
                } else {
                    console.log(response.data.message);
                    
                }

            }).catch(error => {
                console.log(error);
            });
        }
    },
    created() { 
        this.membershipOverDay();
        this.training();
    }
};
</script>
    