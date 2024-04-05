<template>
    <div id="manager">
        <div id="head">
            <h1>FITNESS ON</h1>

        </div>
        <!--헤더-->
        <div class="clearfix">

            <!--내비-->
            <div id="minfo">
                <div>
                    <h3>회원정보</h3>
                    <form v-on:submit.prevent="managerModfiy" action="" id="MemListForm">
                        <label for="">이름</label>
                        <input type="text" v-model="this.memberVo.name" class="MemListinput">
                        <label for="">아이디</label>
                        <input type="text" v-model="this.memberVo.id" class="MemListinput">
                        <label for="">번호</label>
                        <input type="text" v-model="this.memberVo.hp" class="MemListinput"><br>

                        <label for="">주소</label>
                        <input type="text" v-model="this.memberVo.address" class="MemListAddress"><br>
                        <label for="">성별</label>
                        <input type="text" v-model="this.memberVo.gender" class="MemListinput">
                        <label for="">등록상태</label>
                        <input type="text" v-model="this.memberVo.approval" class="MemListinput">
                        <label for="">라커번호</label>
                        <input type="text" v-model="this.memberVo.lockerNo" class="MemListinput">
                        <button type="submit" id="memSubmitBtn">수정</button>
                    </form>
                    <h3>결제정보: 회원권</h3>
                    <table class="ManagerTable">
                        <thead class="ManagerTablehead">
                            <tr>
                                <th>등록일</th>
                                <th>만료일</th>
                                <th>결제금액</th>
                            </tr>
                        </thead>
                        <tbody class="ManagerTablebody">
                            <tr >
                                <td>{{ generalVo.regDate }}</td>
                                <td>{{ generalVo.deadline }}</td>
                                <td>{{ generalVo.price }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <h3>결제정보: pt</h3>
                    <table class="ManagerTable">
                        <thead class="ManagerTablehead">
                            <tr>
                                <th>pt총결제횟수</th>
                                <th>pt이용횟수</th>
                            </tr>
                        </thead>
                        <tbody class="ManagerTablebody">
                            <tr>
                                <td>{{ ptVo.ptTotal }}</td>
                                <td>{{ ptVo.ptCount }}</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <h3>이용내역</h3>
                    <h4>회원권</h4>
                    <table class="ManagerTable">
                        <thead class="ManagerTablehead">
                            <tr>
                                <td>입실시간</td>
                                <td>퇴실시간</td>
                            </tr>
                        </thead>
                        <tbody class="ManagerTablebody">
                            <tr v-bind:key="i" v-for="(a, i) in this.attendList">
                                <td>{{ a.entryTime }}</td>
                                <td>{{ a.leaveTime }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <h4>pt</h4>
                    <table class="ManagerTable">
                        <thead class="ManagerTablehead">
                            <tr>
                                <td>pt이용일</td>
                                <td>강사코멘트</td>
                            </tr>
                        </thead>
                        <tbody class="ManagerTablebody">
                            <tr v-bind:key="i" v-for="(l, i) in this.lessonList">
                                <td>{{ l.lDate }}</td>
                                <td>{{ l.comment }}</td>
                            </tr>
                        </tbody>
                    </table>
                   
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import '@/assets/css/ManagerSite.css';

export default {
    name: 'ManaGer',
    components: {},
    data() {
        return {
            no: this.$route.params.no,
            memberVo: {
                no: "",
                name: "",
                id: "",
                hp: "",
                address: "",
                gender: "",
                approval: "",
                lockerNo: ""
            },
            generalVo:{
                no: "",
                regDate:"",
                deadline:"",
                price:""
            },
            ptVo:{
                no: "",
                ptTotal:"",
                ptCount:""
            },
            attendList:[],
            lessonList:[],
            generalList:[]
        }
    },
    methods: {
        member1() {
            console.log(this.no);
            axios({
                method: 'post', // put, post, delete 
                url: 'http://localhost:9000/api/gym/manager/member/'+this.no,
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                //params: guestbookVo, //get방식 파라미터로 값이 전달
                data: this.no, //put, post, delete 방식 자동으로 JSON으로 변환 전달
                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response.data); //수신데이타
                this.memberVo = response.data.mv //회원 정보

                if(response.data.gv != null){
                    this.generalVo = response.data.gv //최근 이용권
                }
                if(response.data.pv != null){ //pt 결제정보 최근거 하나가 null아닐때만 데이터를 담자
                    this.ptVo = response.data.pv
                } 
                this.attendList = response.data.attendList //출석일 전체 리스트 
                this.lessonList = response.data.lessonList //코멘트 전체 리스트 
                this.generalList = response.data.generalList //회원권 결제 전체 리스트 
                console.log(this.generalVo)
                
            }).catch(error => {
                console.log(error);
            });

        },
        managerModfiy(){
            console.log("수정");
            console.log(this.memberVo);
            axios({
                method: 'put', // put, post, delete  //불러오는것은 GET //저장은 POST
                url: 'http://localhost:9000/api/gym/manager', //''따옴표 문법도 중요
                headers: { 
                    "Content-Type": "application/json; charset=utf-8"}, 
                //params: guestbookVo, 
                data: this.memberVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달 @RequestBody

                responseType: 'json' //수신타입
            }).then(response => { 
                console.log(response); //수신데이타

                window.location.reload();
                   
            }).catch(error => { 
                    console.log(error);
            });
        }
    },
    created() {
        this.member1();
    }
}
</script>
<style>

</style>