<template>
    <div>
        <h1>
            <a href="">Vue-Gym 강사 강사 강사</a>
            <div id="user">
                <div id="loginForm">
                    <form v-on:submit.prevent="login" method="post">

                        <!-- 아이디 -->
                        <div class="form-group">
                            <label class="form-text" for="input-uid">아이디</label> 
                            <input type="text" id="input-uid" name="id" v-model="trainerVo.id" placeholder="아이디를 입력하세요">
                        </div>

                        <!-- 비밀번호 -->
                        <div class="form-group">
                            <label class="form-text" for="input-pass">비밀번호</label> 
                            <input type="text" id="input-pass" name="password" v-model="trainerVo.password" placeholder="비밀번호를 입력하세요"	>
                        </div>

                        
                        <!-- 버튼영역 -->
                        <div class="button-area">
                            <button type="submit" id="btn-submit">로그인</button>
                        </div>

                        <ul v-if="this.$store.state.authUser != null">
                            <li>{{this.$store.state.authUser.name}} 님 안녕하세요^^</li>
                            <li><button v-on:click="logout" type="button" class="btn_s">로그아웃</button></li>
                        </ul>
                        
                    </form>
                </div>
                <!-- //loginForm -->
            </div>
        </h1>
    </div>
</template>
<script>
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