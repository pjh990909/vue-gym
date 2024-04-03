<template>
    <div id="Login-body">
        <p id="head-tag">당신의 운동메이트,</p>
        <h1 id="gym-name">Fitness ON</h1>
        <h2 id="thisislogin">LOGIN</h2>
        <div id="member">
            <div id="loginForm">
                <form v-on:submit.prevent="login" method="post">

                    <!-- 아이디 -->
                    <div class="form-group">
                        <label class="form-text" for="input-mid">ID</label> 
                        <input class="midpw" type="text" id="input-uid" name="id" v-model="trainerVo.id">
                    </div>

                    <!-- 비밀번호 -->
                    <div class="form-group">
                        <label id="text-pass" class="form-text" for="input-pass">PW</label> 
                        <input class="midpw" type="password" id="input-pass" name="password" v-model="trainerVo.password"	>
                    </div>

                    
                    <!-- 버튼영역 -->
                    <div class="l-button-area">
                        <button type="submit" id="l-btn-submit">LOGIN</button>
                        <router-link class="btn-link" id="trainer-link" to="/">회원<br/>페이지로</router-link>
                        <router-link class="btn-link" id="register-link" to="/trainer/join">회원가입</router-link>
                    </div>
                </form>
            </div>
            <!-- //loginForm -->
        </div>
        <div id="l-footer">
            <div id="l-footer-group">CodeCrafters</div>
            <div id="l-Copyright">Copyright (c) All right Reserved</div>
        </div>
        <!--//footer-->
    </div>
</template>
<script>
import "@/assets/css/LoginView.css"
import axios from 'axios';
export default {
    name: "LoginView",
    components: {},
    data() {
        return {
            trainerVo: {
                id: "",
                password: ""
            }
        };
    },
    methods: {
        login(){
            console.log("login");
            console.log(this.trainerVo);
            axios({
                method: 'post', // put, post, delete
                url: 'http://localhost:9000/api/trainer/login',
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                //params: memberVo, //get방식 파라미터로 값이 전달
                data: this.trainerVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달
                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response.data); //수신데이타 authUser
                
                if(response.data.result == "success"){
                    //로그인 사용자 정보
                    let authTrainer = response.data.apiData;

                    //token은 응답문서의 헤더에 있음 
                    console.log(response.headers.authorization.split(" ")[1]);
                    //"Authorization Bearer dajofddjaoadfklh.adfafa"
                    const token = response.headers.authorization.split(" ")[1];

                    //vuex 저장
                    this.$store.commit("setAuthTrainer", authTrainer);
                    this.$store.commit("setToken", token);

                    console.log(authTrainer);
                    console.log(token);

                    this.$router.push("/trainer/main")
                } else {
                    console.log(response.data.message);
                    alert("아이디 패스워드를 확인하세요.");
                }

            }).catch(error => {
                console.log(error);
            });
        }
    },
};
</script>
<style></style>