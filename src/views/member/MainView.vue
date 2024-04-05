<template>
    <AppHeader/>
    <div id="back">
        
        <div id="back2">
            <div>
                <h1 id="fir"><strong class="na">{{ memberVo.name }}</strong> 회원님,</h1>
                <h1 id="sec">안녕하세요!</h1>
            </div>
            <div id="oooo">
                <div>
                    <table id="qqqq">
                        <tbody>
                            <tr>
                                <td id="tttt">나의 등록일</td>
                                <td v-if="memberVo.approval == '등록'" id="yyyy">{{ memberVo.regDate }}</td>
                                <td v-else-if="memberVo.approval == '신청'" id="yyyy">회원등록 대기중</td>
                                <td v-else id="yyyy">회원이 아닙니다</td>
                            </tr>
                            <tr>
                                <td id="tttt">회원권 만료일</td>
                                <td v-if="memberVo.approval == '등록'" id="yyyy">{{ memberVo.deadline }}</td>
                                <td v-else-if="memberVo.approval == '신청'" id="yyyy">회원등록 대기중</td>
                                <td v-else id="yyyy">회원이 아닙니다</td>
                            </tr>
                            <tr>
                                <td id="tttt">남은 PT횟수</td>
                                <td id="yyyy" class="yyyt">
                                    {{memberVo.ptCount}}회
                                    <button id="tkdtp" v-if="memberVo.trainerName != null"><router-link to="/member/book">상세</router-link></button>
                                </td>
                            </tr>
                            <tr>
                                <td id="tttt">나의 강사님</td>
                                <td v-if="memberVo.trainerName != null" id="yyyy">{{ memberVo.trainerName }} 강사님</td>
                                <td v-else id="yyyy">pt를 등록해주세요</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
            </div>
            <div class="clearfix box99">
                <div>
                    <span><button v-if="isNotHere" class="dlqtlf" v-on:click.prevent="entry">입실</button></span>
                    <span><button v-if="isHere" class="dlqtlf" v-on:click.prevent="leave">퇴실</button></span>
                </div>
                <div id="xpdlqmf">
                    <table>
                        <tbody>
                            <tr>
                                <td id="t1">입실시각</td>
                                <td id="t2">{{ attendVo.entryTime }}</td>
                            </tr>
                            <tr>
                                <td id="t1">퇴실시각</td>
                                <td id="t2" >{{ attendVo.leaveTime }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <button id="box33"><router-link to="/member/modify">회원정보<br>수정</router-link></button>
                <button id="box33"><router-link to="/gym/register">회원권<br>등록</router-link></button>
                <button id="box34"><router-link to="/trainer/introduction">PT<br>등록</router-link></button>
            </div>
            <div id="boxbox">
                <button id="box37">락커 번호 : {{memberVo.lockerNo}}번</button>
            </div>

        </div>
        <div id="main_footer">
            <p id="cccc">CodeCrafters</p>
            <p id="mmmm">copyright(c) all rights Reserved.</p>
        </div>

    </div>

</template>
<script>
import AppHeader from "@/components/AppHeader.vue";
import '@/assets/css/Main.css';
import axios from 'axios';
export default {
    name: 'memberMainView',
    components: {
        AppHeader
    },
    data() {
        return {
        memberVo: {
            name: "",
            regDate: "",
            deadline: "",
            ptCount: "",
            trainerName: "",
            lockerNo: "",
            approval: ""
        },
        attendVo: {
            leaveTime: "",
            entryTime: ""
        },
        isHere: false,
        isNotHere: true,
        };
    },
    methods: {
        mainform() {
            console.log("mainform");
                axios({
                    method: "get",
                    url: "http://localhost:9000/api/member/main",
                    headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    Authorization: "Bearer " + this.$store.state.token
                    },
                    responseType: "json"
                }).then(response => {
                    console.log(response.data);
                    if (response.data.result == "success") {
                        console.log(response.data.apiData);
                        this.memberVo = response.data.apiData;
                    } else {
                        console.log(response.data.message);
                        alert("로그인 하세요");
                        this.$router.push("/member/login");
                    }
                }).catch(error => {
                    console.log(error);
                });
        },
        entry(){
            console.log("entry");
            this.attendVo.entryTime = "";
            this.attendVo.leaveTime = "";
                axios({
                    method: 'post', // put, post, delete
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
                        this.attendVo.entryTime = response.data.apiData;
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
                        this.attendVo.leaveTime = response.data.apiData;
                    } else {
                        console.log(response.data.message);
                        
                    }

                }).catch(error => {
                    console.log(error);
                });
        }
    },
    created() {
        this.mainform();
    }
};
</script>