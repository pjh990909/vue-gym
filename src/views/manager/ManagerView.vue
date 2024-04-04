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
                    <table border="1px solid #000000">
                        <thead>
                            <tr>
                                <td>이름</td>
                                <td>번호</td>
                                <td>등록일수</td>
                                <td>등록상태</td>
                                <td>만료일</td>
                                <td>라커번호</td>
                                <td>pt강사</td>
                                <td>등록횟수</td>
                                <td>잔여횟수</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-bind:key="i" v-for="(v,i) in managerVo1">
                                <td><RouterLink :to="`/manager/memberlist/${v.no}`">{{v.name}}</RouterLink></td>
                                <td>{{v.hp}}</td>
                                <td>{{v.period}}일</td>
                                <td v-if="v.approval == '신청'"><button v-on:click.prevent="approve(v.no)">{{v.approval}}</button></td>
                                <td v-else>{{v.approval}}</td>
                                <td v-if="v.approval == '등록'">{{v.deadline}}</td>
                                <td v-else></td>
                                <td>{{v.lockerNo}}</td>
                                <td>{{v.tName}}</td>
                                <td>{{v.ptTotal}}</td>
                                <td>{{v.ptCount}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div id="paging">
                    <ul>
                        <li v-bind:key="i" v-for="(e,i) in endNo">
                            <a v-on:click.prevent="list(i+1)" href="">{{ i+1 }}</a>
                        </li>
                    </ul>

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
            managerVo1:[],
            util:{
                page: 1,
                keyword: ""
            },
            endNo:""
        }
    },
    methods: {
        list(page) {
            this.util.page=page;
            console.log(this.util)
            axios({
                method: 'post', // put, post, delete 
                url: 'http://localhost:9000/api/gym/manager',
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                //params: guestbookVo, //get방식 파라미터로 값이 전달
                data: this.util, //put, post, delete 방식 자동으로 JSON으로 변환 전달
                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response.data); //수신데이타
                this.managerVo1 = response.data.list
                console.log(this.managerVo1)
                this.endNo = response.data.endPageBtnNo
            }).catch(error => {
                console.log(error);
            });

        },
        approve(no){
            axios({
                method: 'put', // put, post, delete 
                url: 'http://localhost:9000/api/gym/manager/'+no,
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                //params: guestbookVo, //get방식 파라미터로 값이 전달
                data: {no}, //put, post, delete 방식 자동으로 JSON으로 변환 전달
                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response.data); //수신데이타
                window.location.reload();
            }).catch(error => {
                console.log(error);
            });
        }
        
    },
    created(){
        this.list(1);
    }
}
</script>