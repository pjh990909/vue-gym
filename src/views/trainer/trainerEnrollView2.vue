<template>
    <TrainerHeader/>
    <div id="trEnrollAll">
        <div>
            <h1 id="trEnrollTitle">WELCOME</h1>
        </div>
        <div>
            <h2 id="trEnrollSubtitle">트레이너 수정</h2>
        </div>
        <div>
            <form v-on:submit.prevent="uploadFile" action="" method="">
                <div>
                    <img id="EnrollImgTray" v-bind:src="`http://localhost:9000/upload/${trainerVo.saveName}`" alt="">
                    
                </div>
                
                <div class="filebox">
                    <label for="file">사진등록</label>
                    <input v-on:change="selectFile" id="file" type="file">
                </div>
                <div>
                    <label id="EnrollTrNameInput">이름 : </label>
                    <span id="EnrollTrName">{{ trainerVo.name }}</span>
                </div>
                <div>
                    <label id="trEnrollCareer">경력</label>
                    <input type="text" id="trEnrollCareerInput" v-model="trainerVo.career">
                </div>
                <button type="submit" id="trEnrollBtn">트레이너 수정</button>
                <input type="hidden" v-model="trainerVo.trainer_no">
            </form>
        </div>
        <span class="footer1">CodeCrafters</span>
        <span class="footer2">copyright(c) all rights Reserved</span>
    </div>
</template>


<script>
import TrainerHeader from"@/components/TrainerHeader.vue";
import "@/assets/css/trainerEnroll.css"
import axios from 'axios';

export default {
    name: "trainerEnrollTwoView",
    components: {
        TrainerHeader
    },
    data() {
        return {
            trainerVo:{
                trainer_no:"",
                saveName: "",
                name:"",
                career:""
            },
            file:"",

        };
    },
    methods: {
        getAuthUsermodifyform() {
            axios({
                method: 'get', // put, post, delete                   
                url: 'http://localhost:9000/api/trainer/trainerupdateinsert',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": "Bearer " + this.$store.state.token
                },//전송타입+토큰

                //params: guestbookVo, //get방식 파라미터로 값이 전달
                //data: guestbookVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response.data.apiData); //수신데이타
                if(response.data.result == "success"){
                    this.trainerVo = response.data.apiData;
                }else{
                    console.log(response.data.message);
                    alert("로그인상태에서 이용해주세요.");
                    this.$router.push({path:'/user/loginform'});
                }
                

            }).catch(error => {
                console.log(error);
            });

        },

        selectFile(event){
            console.log("사진선택");
            this.file = event.target.files[0];
        },
        uploadFile(){
            console.log("등록");

            let formData = new FormData();
            formData.append("file",this.file);
            formData.append("trainer_no",this.trainerVo.trainer_no);
            formData.append("career",this.trainerVo.career);

            axios({
                method: 'put', // put, post, delete                   
                url: 'http://localhost:9000/api/trainer/trainerupdateinsert',
                headers: {
                    "Content-Type": "multipart/form-data",},//전송타입+토큰
                //params: guestbookVo, //get방식 파라미터로 값이 전달
                data: formData, //put, post, delete 방식 자동으로 JSON으로 변환 전달

                responseType: 'json' //수신타입
            }).then(response => {

                
                console.log(response.data.apiData);
                
                this.$router.push({path:'/gym/trainerintroduction'});

            }).catch(error => {
                console.log(error);
            });
        }
    },
    created(){
        this.getAuthUsermodifyform();
    }
};
</script>


<style></style>