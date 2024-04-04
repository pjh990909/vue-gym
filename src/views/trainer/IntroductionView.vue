<template>
    <div>
        <div v-if="this.$store.state.authTrainer != null"><TrainerHeader/></div>
        <div v-else><AppHeader/></div>
    </div>
    <div id="trainerList-All">
        <div id="trainers-logo">TRAINERS</div>

        <div id="trainer-logo2">마음에 드는 강사님을 선택해보세요!</div>

        <div id="trainer-btn" v-if="this.$store.state.authTrainer != null">
            <button class="trainerinsert-btn" type="button"><router-link id="trainerinsert-link" to="/trainer/enroll">트레이너 등록</router-link></button>
            <button class="trainerupdate-btn" type="button"><router-link id="trainerupdate-link" to="/trainer/enroll2">트레이너 수정</router-link></button>
        </div>
        <div id="trlist">
            <div id="trainerList" v-bind:key="i" v-for="(trainerVo, i) in trainerList">
                <li id="trainerListli">
                    <div>
                        <img id="trainerlist-img" v-bind:src="`http://localhost:9000/upload/${trainerVo.saveName}`">
                    </div>

                    <div>
                        <label id="trainername-introduction" class="trainer-introduction-information">{{ trainerVo.name}} 강사님</label>
                    </div>
                    <div>
                        <label class="trainer-introduction-information">경력:</label>
                        <span class="trainer-introduction-information">{{ trainerVo.career }}</span>
                    </div>
                    <div class="pt-insert">
                        <select name="pt"> <!--기본값을 지정한값으로 한다(v-model로 바뀐값을 보낼수도 있다)-->
                            <option class="" value="">PT횟수</option>
                            <option class="o-ptCount" value="10">10</option>
                            <option class="o-ptCount" value="20">20</option>
                            <option class="o-ptCount" value="30">30</option>
                        </select>
                        <input type="hidden" value="" v-model="trainerVo.trainerNo">

                        <button v-on:click="ptup($event, trainerVo.trainerNo)" type="button">등록</button>
                    </div>
                </li>
            </div>
        </div>
    </div>
</template>

<script>
import AppHeader from"@/components/AppHeader.vue";
import TrainerHeader from"@/components/TrainerHeader.vue";
import axios from 'axios';
import "@/assets/css/trainerintroduction.css"

export default {
    name: "TrainerIntroductionView",
    components: {
        TrainerHeader,
        AppHeader
    },
    data() {
        return {
            trainerList: [],
            trainerVo: {
                trainerNo: this.$route.params.no,
                name: "",
                saveName: "",
                career: ""
            },
            ptVo: {
                trainerNo: "",
                ptCount: ""
            }

        };
    },
    methods: {
        getList() {
            console.log("데이터 가져오기")

            axios({
                method: 'get', // put, post, delete                   
                url: 'http://localhost:9000/api/trainer/trainerintroduction',
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                //params: guestbookVo, //get방식 파라미터로 값이 전달
                //data: guestbookVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response.data); //수신데이타
                this.trainerList = response.data.apiData;
                console.log(this.trainerList);
            }).catch(error => {
                console.log(error);
            });

        },
        ptup(event, ptno) {
            //console.log("=======================");
            //console.log(event.target.parentElement.firstElementChild.value);
            //console.log(ptno);
            this.ptVo.trainerNo = ptno;
            this.ptVo.ptCount = event.target.parentElement.firstElementChild.value;
            
            console.log(this.ptVo);

            axios({
                method: 'post', // put, post, delete                   
                url: 'http://localhost:9000/api/pt/registration',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": "Bearer " + this.$store.state.token
                },//전송타입+토큰
                //params: guestbookVo, //get방식 파라미터로 값이 전달
                data: this.ptVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response.data.apiData);

                if (response.data.result == "success") {

                    this.$router.push({ path: '/gym/memberloginsussecc' });
                } else {
                    alert("횟수를 선택해주세요");
                }


            }).catch(error => {
                console.log(error);
            });

        }
    },
    created() {
        this.getList();
    }
};

</script>

<style></style>