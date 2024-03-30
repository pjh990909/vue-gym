<template>
    <div>
        <h1>
            강사 강사 강사 회원가입 강사 강사 강사
        </h1>

        <div>
            <form v-on:submit.prevent="join" action="">
                <label for="">아이디</label>
                <input type="text" v-model="trainerVo.id">
                <button v-on:click="idCheck" type="button">중복체크</button><br>
                <p v-if="isDuplicated">이미 사용중인 아이디입니다.</p>
                <p v-else-if="isNotDuplicated">사용 가능한 아이디입니다.</p>
                <p v-else>아이디를 입력해주세요</p>

                <label for="">비밀번호</label>
                <input type="text" v-model="trainerVo.password"><br>

                <label for="">이름</label>
                <input type="text" v-model="trainerVo.name"><br>

                <label for="">번호</label>
                <input type="text" placeholder="" v-model="trainerVo.hp"><br>

                <label for="">주소</label>
                <input type="text" v-model="trainerVo.address"><br>

                <label for="">성별</label>
                <label for="male">남자</label>
                <input type="radio" id="male" value="male" v-model="trainerVo.gender">
                <label for="female">여자</label>
                <input type="radio" id="female" value="female" v-model="trainerVo.gender">
                <br>
                
                <label for="">나이</label>
                <input type="text" v-model="trainerVo.age"><br>
                
                <button type="submit">회원가입</button>
            </form>
        </div>
    </div>
</template>
<script>

import axios from 'axios';


export default {
    name: "TrainerJoin",
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
            },
            check: 0,
            isDuplicated: false,
            isNotDuplicated: false
        }
    },
    methods: {
        idCheck() {
            //let id = this.memberVo.id;
            console.log(this.trainerVo);
            if (this.trainerVo.id == "") {
                alert("아이디를 입력해주세요")
            } else {
                console.log(this.trainerVo);
                axios({
                    method: 'put', // put, post, delete
                    url: 'http://localhost:9000/api/trainer/join',
                    headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                    //params: userVo, //get방식 파라미터로 값이 전달
                    data: this.trainerVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달
                    responseType: 'json' //수신타입
                }).then(response => {
                    console.log(response.data); //수신데이타

                    if(response.data == 0){
                        this.isNotDuplicated = true;
                        this.isDuplicated = false;
                        this.check = 1;
                    } else {
                        this.isDuplicated = true;
                        this.isNotDuplicated = false;
                    }
                    
                }).catch(error => {
                    console.log(error);
                });
            }

        },
        join() {
            if (this.check != 1) {
                alert("아이디 중복확인을 해주세요")
            } else {//중복체크 완료되면 바꾸기 ++ 빈칸 잇으면 메세지창 띄우기
                console.log(this.trainerVo)
                axios({
                    method: 'post', // put, post, delete 
                    url: 'http://localhost:9000/api/trainer/join',
                    headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                    //params: guestbookVo, //get방식 파라미터로 값이 전달
                    data: this.trainerVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달
                    responseType: 'json' //수신타입
                }).then(response => {
                    console.log(response.data); //수신데이타
                    if(response.data == 1){
                        this.$router.push("/trainer/login");
                    } else {
                        alert("회원가입에 실패하였습니다");
                    }
                    

                }).catch(error => {
                    console.log(error);
                });
            }
        }
    }
}

</script>