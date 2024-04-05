<template>
    <TrainerHeader/>
    <div id="MemberListAll">
        <h1 id="MemberListTitle1">MEMBER</h1>
        <h1 id="MemberListTitle2">LIST</h1>

        <div id="postInfoAll">
            <table id="postTable">
                <colgroup>
                    <col style="width: 27%;">
                    <col style="width: 46%;">
                    <col style="width: 27%;">
                </colgroup>
                <thead id="postTableHead">
                    <tr>
                        <th class="postTableHeadData">성함</th>
                        <th class="postTableHeadData">PT 잔여횟수</th>
                        <th class="postTableHeadData">강사</th>
                    </tr>
                </thead>
                <tbody id="postTableBody" v-bind:key="index" v-for="(myMemberVo, index) in ptList">
                    <tr>
                        <td class="postTableBodyData"><RouterLink :to="`/trainer/book?no=${myMemberVo.no}`">{{ myMemberVo.membername }}</RouterLink></td>
                        <td class="postTableBodyData">{{ myMemberVo.ptCount }}</td>
                        <td class="postTableBodyData">{{ myMemberVo.trainername }}</td>
                    </tr>
                </tbody>
            </table>
            <input type="text" id="postSearch" placeholder="검색" v-model="myMemberVo.keyword" v-on:keyup.enter="search">
            <ol id="memberList">


                <li class="" v-if="prev != false" v-on:click="prevPage">이전</li>
                <li class="" v-else-if="prev == true" v-on:click="prevPage">이전</li>
                <li id="memberlistpage" v-bind:key="index" v-for="(i, index) in endNo-startNo+1">

                    <a v-on:click.prevent="list(startNo+i)" href="">{{startNo+i-1}}</a>

                </li>
                <li v-if="next == true" v-on:click="nextPage">다음</li>

            </ol>

        </div>

        <span class="listfooter1">CodeCrafters</span>
        <span class="listfooter2">copyrights(c) all rights Reserved</span>
    </div>
</template>


<script>
import "@/assets/css/MyMemberList.css"
import TrainerHeader from "@/components/TrainerHeader.vue";
import axios from 'axios';


export default {
    name: "MyMemberListView",
    components: {
        TrainerHeader
    },
    data() {
        return {
            ptList: [],
            myMemberVo: {

                crtPage: 1,
                keyword: ""
            },
            startNo: 0,
            endNo: 0,
            next: "",
            prev: ""
        };
    },
    methods: {
        getMymemberList(list) {
            console.log("데이터 가져오기")
            if (this.myMemberVo.crtPage == 1) {
                this.myMemberVo.crtPage = 1;
            } else if (this.myMemberVo.crtPage < 1) {
                this.myMemberVo.crtPage = 1;
            }
            else {
                this.myMemberVo.crtPage = list - 1;
            }

            console.log(this.myMemberVo.crtPage);
            axios({
                method: 'post', // put, post, delete                   
                url: 'http://localhost:9000/api/pt/mymemberlist',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": "Bearer " + this.$store.state.token
                }, //전송타입
                //params: guestbookVo, //get방식 파라미터로 값이 전달
                data: this.myMemberVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response.data.apiData); //수신데이타
                this.ptList = response.data.apiData.ptList;
                this.endNo = response.data.apiData.endPageBtnNo;
                this.startNo = response.data.apiData.startPageBtnNo;
                this.next = response.data.apiData.next;
                this.prev = response.data.apiData.prev;
            }).catch(error => {
                console.log(error);
            });

        },
        search() {
            this.myMemberVo.crtPage = 1;
            this.getMymemberList();
        },
        list(page) {
            this.myMemberVo.crtPage = page;
            this.getMymemberList(this.myMemberVo.crtPage);
        },
        prevPage() {
            if (this.prev == false) {
                console.log(this.myMemberVo.crtPage);
                this.getMymemberList(this.myMemberVo.crtPage);
            }
        },
        nextPage() {
            if (this.next == true) {
                this.myMemberVo.crtPage = this.myMemberVo.crtPage + 6;
                this.getMymemberList(this.myMemberVo.crtPage);
            }
        }
    },
    created() {
        this.getMymemberList();
    }
};
</script>


<style></style>