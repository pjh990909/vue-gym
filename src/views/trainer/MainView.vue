<template>
    <div id="back">
        <div id="back2">
            <div>
                <h1 id="fir"><strong class="na">{{ trainerVo.name }}</strong> 강사님,</h1>
                <h1 id="sec">안녕하세요!</h1>
            </div>
            <div>
                <img id="pi" v-bind:src="`http://localhost:9000/upload/{{ trainerVo.saveName }}`">
            </div>
            <div>
                <table id="count">
                    <tbody>
                        <tr>
                            <td id="allcount">전체 회원수</td>
                            <td id="sercount">{{ trainerVo.totalMember }} 명</td>
                        </tr>
                        <tr>
                            <td id="allcount">나의 회원수</td>
                            <td id="sercount">{{ trainerVo.trainerMember }}명</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <button id="box33">트레이너<br>등록</button>
                <button id="box33">전체<br>회원</button>
                <button id="box34">나의<br>회원</button>
            </div>
            <div id="boxbox">
                <button id="box35"><router-link to="/trainer/modify">회원정보 수정</router-link></button>
                <button id="box36" v-on:click.prevent="logout">LOG OUT</button>
            </div>
        </div>
        <div>
            <img id="can">
        </div>
        <div>
            <p id="cccc">CodeCrafters</p>
            <p id="mmmm">copyright(c) all rights Reserved.</p>
        </div>

    </div>

</template>
<script>
import axios from 'axios';
import "@/assets/css/Main.css"
export default{
    name: 'MainView',
    components: {},
    data(){
        return{
            trainerVo: {
            name: "",
            saveName: "",
            totalMember: "",
            trainerMember: ""
        }
        };
    },
    methods: {
        mainform(){
        console.log("mainform");
        axios({
            method: 'get',  //put,post,delete
            url: 'http://localhost:9000/api/trainer/main',
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
        logout(){
                console.log("로그아웃");
                this.$store.commit("setAuthUser", null);
                this.$store.commit("setToken", null);
                this.$router.push("/trainer/login");
        }
    },
    created(){ 
        this.mainform();
    }
}
</script>