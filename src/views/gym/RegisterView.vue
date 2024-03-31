<template>
    <div>
        <form v-on:submit.prevent="register" method="post">
            <img id="price-img" src="@/assets/image/general.jpg"><br>
            <div>
                <label>등록일수</label><br>
                <label for="30"> 30일 </label>
                <input type="radio" name="remainDate" id="30" value="30" v-model="generalVo.remainDate">
                <label for="90"> 90일 </label>
                <input type="radio" name="remainDate" id="90" value="90" v-model="generalVo.remainDate">
                <label for="180"> 180일 </label>
                <input type="radio" name="remainDate" id="180" value="180" v-model="generalVo.remainDate">
                <label for="360"> 360일 </label>
                <input type="radio" name="remainDate" id="360" value="360" v-model="generalVo.remainDate">
            </div>
            <div class="button-area">
                <button type="submit" id="btn-submit">회원권 등록</button>
            </div>
        </form>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: "RegisterView",
    components: {},
   data() {
        return {
            generalVo: {
                no: this.$store.state.authUser.no,
                remainDate: "",
            }
        };
    },
    methods: {
        register(){
            console.log("register");
            console.log(this.generalVo);
            axios({
                method: 'post', // put, post, delete
                url: 'http://localhost:9000/api/general/register',
                headers: { "Content-Type": "application/json; charset=utf-8" 
                            , "Authorization": "Bearer " + this.$store.state.token
                }, //전송타입 + 토큰

                //params: userVo, //get방식 파라미터로 값이 전달
                data: this.generalVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response.data); //수신데이타
                if(response.data.result == "success"){
                    console.log("result: success");
                    alert("결제 만들고 싶은데");
                    this.$router.push("/");
                } else {
                    console.log(response.data.message);
                    alert("로그인 하세요");
                    this.$router.push("/trainer/login");
                }

            }).catch(error => {
                console.log(error);
            });
        }
    },
    created() { }
};
</script>
<style>
#price-img{
    width: 400px;
    height: 500px;
}
</style>