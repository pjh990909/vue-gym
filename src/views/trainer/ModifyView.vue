<template>
    
    <div class="memberModifyform">
        <TrainerHeader/>
        <h2 class= "mbModifytxt" >회원 정보 수정</h2>
            <form v-on:submit.prevent="modifyTrainer" method="put">
                <div class="id-group">
                    <label class="id" for="id">ID</label>
                    <span id="id">{{ trainerVo.id }}</span>
                </div>

                <div class="pw-group">
                    <label class="pw" for="pw">PW</label>
                    <input type="password" id="pwbox" v-model="trainerVo.password">
                </div>
                <div class="name-group">
                    <label class="name" for="name">성명</label>
                    <input type="text" id="namebox" v-model="trainerVo.name">
                </div>
                <div class="hp-group">
                    <label class="hp" for="hp">HP</label>
                    <input type="text" id="hpbox" v-model="trainerVo.hp">
                </div>
                <div class="age-group">
                    <label class="age" for="age">나이</label>
                    <input type="text" id="agebox" v-model="trainerVo.age">
                </div>
                <div class="address-group">
                    <label class="address" for="address">주소</label>
                    <textarea id="addressbox" v-model="trainerVo.address"></textarea>
                </div>
                
                <button id="saveBtn" type="submit">저장</button>
            </form>
            <!--//modifyform-->
        
        <!--<GymFooter /> -->
        <!-- //footer -->
    </div>
</template>
<script>
import TrainerHeader from"@/components/TrainerHeader.vue";
import "@/assets/css/modifyform.css"
import axios from 'axios';
export default {
name: "ModifyView",
components: {
    TrainerHeader
},
data() {
    return {
        trainerVo: {
            id: "",
            password: "",
            name: "",
            address: "",
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
                this.$router.push("/trainer/main");
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