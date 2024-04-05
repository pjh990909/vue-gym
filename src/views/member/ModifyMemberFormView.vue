<template>
    <div class="memberModifyform">
        <div id="join-heading">
            WELCOME
        </div>
        <h2 class= "mbModifytxt" >회원 정보 수정</h2>
            <form v-on:submit.prevent="modifyMember" method="put" id="memberJoinForm">
                <div class="id-group">
                    <label class="id" for="id">ID</label>
                    <span id="id">{{ memberVo.id }}</span>
                </div>

                <div class="pw-group">
                    <label class="pw" for="pw">PW</label>
                    <input type="password" id="pwbox" v-model="memberVo.password">
                </div>
                <div class="name-group">
                    <label class="name" for="name">성명</label>
                    <input type="text" id="namebox" v-model="memberVo.name">
                </div>
                <div class="hp-group">
                    <label class="hp" for="hp">HP</label>
                    <input type="text" id="hpbox" v-model="memberVo.hp">
                </div>
                <div class="age-group">
                    <label class="age" for="age">나이</label>
                    <input type="text" id="agebox" v-model="memberVo.age">
                </div>
                <div class="address-group">
                    <label class="address" for="address">주소</label>
                    <textarea id="addressbox" v-model="memberVo.address"></textarea>
                </div>
                
                <button id="saveBtn" type="submit">저장</button>
            </form>
            <!--//modifyform-->
        
        <GymFooter />
        <!-- //footer -->
    </div>
</template>

<script>
import "@/assets/css/joinform.css"
//import GymFooter from '@/components/GymFooter.vue'; 
import axios from 'axios';
export default {
    name: "ModifyMemberFormView",
    components: {
        //GymFooter
    },
    data() {
        return {
            memberVo: {
                id:'',
                password: '',
                name: '',
                hp: '',
                age: '',
                address: ''
            }
        };
    },
    methods: {
        modifyform() {
            console.log("modifyForm");
            console.log(this.memberVo);
            //서버로 전송
            axios({
                method: 'get', // put, post, delete  //불러오는것은 GET //저장은 POST
                url: 'http://localhost:9000/api/member/modify', //''따옴표 문법도 중요
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                    , "Authorization": "Bearer " + this.$store.state.token
                },
                //params: guestbookVo, //get방식 파라미터로 값이 전달 @ModelAttribute
                data: this.memberVo.no, //put, post, delete 방식 자동으로 JSON으로 변환 전달 @RequestBody

                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response.data.apiData); //수신데이타
                
                this.memberVo = response.data.apiData;

            }).catch(error => {
                console.log(error);
            });

        },
        modifyMember(){   
            console.log("클릭");
            console.log(this.memberVo);
            //서버로 전송
            axios({
                method: 'put', // put, post, delete  //불러오는것은 GET //저장은 POST
                url: 'http://localhost:9000/api/member/modify', //''따옴표 문법도 중요
                headers: { 
                    "Content-Type": "application/json; charset=utf-8"
                    , "Authorization": "Bearer " + this.$store.state.token
                }, 
                //params: guestbookVo, 
                data: this.memberVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달 @RequestBody

                responseType: 'json' //수신타입
            }).then(response => { 
                console.log(response); //수신데이타
                console.log(response.data.apiData)

                if(response.data.result == "success"){
                console.log("result: success");
                let name = response.data.apiData.name;

                //vuex의 이름을 변경
                this.$store.commit("setAuthName", name);

                //메인페이지로 이동
                this.$router.push("/member/main");
                } else {
                console.log(response.data.message);
                this.$store.commit("setAuthUser", null);
                this.$store.commit("setToken", null);
                }   
                
                   
            }).catch(error => { 
                    console.log(error);
            });
        },
    
    },
    created(){
        this.modifyform();
    }
};
</script>