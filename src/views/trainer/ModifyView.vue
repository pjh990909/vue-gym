<template>
	<div>
        <div id="modifyForm">
            <form v-on:submit.prevent="modifyTrainer" method="put">

                <!-- 아이디 -->
                <div class="form-group">
                    <label class="form-text" for="input-uid">아이디</label> 
                    <span class="text-large bold">{{trainerVo.id}}</span>
                </div>

                <!-- 비밀번호 -->
                <div class="form-group">
                    <label class="form-text" for="input-pass">패스워드</label> 
                    <input type="text" id="input-pass" name="password" v-model="trainerVo.password" placeholder="비밀번호를 입력하세요"	>
                </div>

                <!-- 이름 -->
                <div class="form-group">
                    <label class="form-text" for="input-name">이름</label> 
                    <input type="text" id="input-name" name="name" v-model="trainerVo.name" placeholder="이름을 입력하세요">
                </div>

                <!--번호-->
                <div>
                    <label for="">전화번호</label>
                    <input type="text" placeholder="" v-model="trainerVo.hp"><br>
                </div>

                <!--주소-->
                <label for="">주소</label>
                <input type="text" v-model="trainerVo.address"><br>

                <!-- 성별 -->
                <div class="form-group">
                    <span class="form-text">성별</span> 
                    
                    <label for="rdo-male">남</label> 
                    <input type="radio" id="rdo-male" name="gender" value="male" v-model="trainerVo.gender"> 
                    
                    <label for="rdo-female">여</label> 
                    <input type="radio" id="rdo-female" name="gender" value="female" v-model="trainerVo.gender"> 
                </div>

                <!--나이-->
                <label for="">나이</label>
                <input type="text" v-model="trainerVo.age"><br>

                <!-- 버튼영역 -->
                <div class="button-area">
                    <button type="submit" id="btn-submit">회원정보수정</button>
                </div> 
            </form> 
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
name: "ModifyView",
components: {},
data() {
    return {
        trainerVo: {
            id: "",
            password: "",
            name: "",
            address: "",
            gender: "",
            hp: "",
            age: ""
        }
    };
},
methods: {
    modifyform(){
        console.log("modifyForm");
        axios({
            method: 'get',  //put,post,delete
            url: 'http://localhost:9000/api/trainer/modify',
            headers: { "Content-Type": "application/json; charset=utf-8" 
                        , "Authorization": "Bearer " + this.$store.state.token
            }, //전송타입 + 토큰

            //params: userVo, //get방식 파라미터로 값이 전달
            //data: this.userVo.no, //put, post, delete 방식 자동으로 JSON으로 변환 전달

            responseType: 'json' //수신타입
        }).then(response => {
            console.log(response.data); //수신데이타
            if(response.data.result == "success"){
                console.log("result: success");
                this.trainerVo = response.data.apiData;
            } else {
                console.log(response.data.message);
                alert("로그인 하세요");
                this.$router.push("/trainer/login");
            }

        }).catch(error => {
            console.log(error);
        });
    },
    modifyTrainer(){
        console.log("modifyTrainer");
        axios({
            method: 'put',  //put,post,delete
            url: 'http://localhost:9000/api/trainer/modify',
            headers: { "Content-Type": "application/json; charset=utf-8" 
            , "Authorization": "Bearer " + this.$store.state.token
            }, //전송타입
            //params: phonebookVo, //get방식 파라미터로 값이 전달
            data: this.trainerVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

            responseType: 'json' //수신타입
        }).then(response => {
            console.log(response);
            console.log(response.data.apiData); //수신데이타

            if(response.data.result == "success"){
                console.log("result: success");
                let name = response.data.apiData;

                //vuex의 이름을 변경
                this.$store.commit("setAuthName", name);

                //메인페이지로 이동
                this.$router.push("/trainer/login");
            } else {
                console.log(response.data.message);
                this.$store.commit("setAuthUser", null);
                this.$store.commit("setToken", null);
            }


        }).catch(error => {
            console.log(error);
        });
    }
},
created(){
        this.modifyform();     
    },
};
</script>
<style></style>