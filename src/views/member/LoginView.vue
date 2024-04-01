<template>
    <div>
        <p>당신의 운동메이트,</p>
        <h1>Fitness ON</h1>
        <h2>LOGIN</h2>
        <div id="member">
            <div id="loginForm">
                <form v-on:submit.prevent="login" method="post">

                    <!-- 아이디 -->
                    <div class="form-group">
                        <label class="form-text" for="input-mid">ID</label> 
                        <input type="text" id="input-uid" name="id" v-model="memberVo.id">
                    </div>

                    <!-- 비밀번호 -->
                    <div class="form-group">
                        <label id="text-pass" class="form-text" for="input-pass">PW</label> 
                        <input type="password" id="input-pass" name="password" v-model="memberVo.password"	>
                    </div>

                    
                    <!-- 버튼영역 -->
                    <div class="button-area">
                        <button type="submit" id="btn-submit">LOGIN</button>
                        <router-link class="btn-link" id="trainer-link" to="/trainer/login">트레이너 페이지로</router-link>
                        <router-link class="btn-link" id="register-link" to="/member/register">회원가입</router-link>
                    </div>
                </form>
            </div>
            <!-- //loginForm -->
        </div>
        <div id="footer">
            <div id="footer-group">CodeCrafters</div>
            <div id="Copyright">Copyright (c) All right Reserved</div>
        </div>
        <!--//footer-->
    </div>
</template>
<script>
import "@/assets/css/JoinView.css"
import axios from 'axios';
export default {
    name: "LoginView",
    components: {},
    data() {
        return {
            memberVo: {
                id: "",
                password: ""
            }
        };
    },
    methods: {
        login(){
            console.log("login");
            console.log(this.memberVo);
            axios({
                method: 'post', // put, post, delete
                url: 'http://localhost:9000/api/member/login',
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                //params: memberVo, //get방식 파라미터로 값이 전달
                data: this.memberVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달
                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response.data); //수신데이타 authUser
                
                if(response.data.result == "success"){
                    //로그인 사용자 정보
                    let authUser = response.data.apiData;

                    //token은 응답문서의 헤더에 있음 
                    console.log(response.headers.authorization.split(" ")[1]);
                    //"Authorization Bearer dajofddjaoadfklh.adfafa"
                    const token = response.headers.authorization.split(" ")[1];

                    //vuex 저장
                    this.$store.commit("setAuthUser", authUser);
                    this.$store.commit("setToken", token);

                    console.log(authUser);
                    console.log(token);

                    this.$router.push("/member/main");
                } else {
                    console.log(response.data.message);
                    alert("아이디 패스워드를 확인하세요.");
                }

            }).catch(error => {
                console.log(error);
            });
        },
        logout(){
            console.log("로그아웃");
            this.$store.commit("setAuthUser", null);
            this.$store.commit("setToken", null);
        }
    },
};
</script>
<style></style>