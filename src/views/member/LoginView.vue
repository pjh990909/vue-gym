<template>
    <div>
        <h1>
            <a href="">Vue-Gym</a>
            <div id="user">
                <div id="loginForm">
                    <form v-on:submit.prevent="login" method="post">

                        <!-- 아이디 -->
                        <div class="form-group">
                            <label class="form-text" for="input-uid">아이디</label> 
                            <input type="text" id="input-uid" name="id" v-model="memberVo.id" placeholder="아이디를 입력하세요">
                        </div>

                        <!-- 비밀번호 -->
                        <div class="form-group">
                            <label class="form-text" for="input-pass">비밀번호</label> 
                            <input type="text" id="input-pass" name="password" v-model="memberVo.password" placeholder="비밀번호를 입력하세요"	>
                        </div>

                        
                        <!-- 버튼영역 -->
                        <div class="button-area">
                            <button type="submit" id="btn-submit">로그인</button>
                        </div>
                        
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

                    this.$router.push("/");
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