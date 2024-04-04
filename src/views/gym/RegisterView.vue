<template>
    <AppHeader/>
    <div id="body">
        <h2 id="body-mem">MEMBERSHIP</h2>
        <h3 id="body-mem-reg">회원권 등록</h3>

        <div>
            <table id="membership-price">
                <tr>
                    <th>1개월</th>
                    <td>110,000</td>
                </tr>
                <tr>
                    <th>3개월</th>
                    <td>210,000</td>
                </tr>
                <tr>
                    <th>6개월</th>
                    <td>350,000</td>
                </tr>
                <tr>
                    <th>12개월</th>
                    <td>550,000</td>
                </tr>
            </table>
        </div>
        

        <div>
            <form v-on:submit.prevent="register" method="post">

                <div id="radio-date">
                    <label id="check-plz">회원권을 선택해주세요</label>

                    <div id="rdo-1">
                        <input type="radio" name="remainDate" id="30" value="30" v-model="memberVo.period">
                        <label for="30" class="rdo-date">1개월</label>
                        <input type="radio" name="remainDate" id="90" value="90" v-model="memberVo.period">
                        <label for="90" class="rdo-date">3개월</label>
                    </div>
                    <div id="rdo-6">
                        <input type="radio" name="remainDate" id="180" value="180" v-model="memberVo.period">
                        <label for="180" class="rdo-date">6개월</label>
                        <input type="radio" name="remainDate" id="360" value="365" v-model="memberVo.period">
                        <label for="360" class="rdo-date">12개월</label>
                    </div>
                </div>
                <div class="button-area">
                    <button type="submit" id="btn-submit">회원권 등록하기</button>
                </div>
            </form>
        </div>

        <div id="gr-footer">
            <div id="gr-footer-group">CodeCrafters</div>
            <div id="gr-Copyright">Copyright (c) All right Reserved</div>
        </div>
    </div>
</template>

<script>
import AppHeader from"@/components/AppHeader.vue";
import '@/assets/css/gym/Membership.css';
//import axios from 'axios';
export default {
    name: "RegisterView",
    components: {
        AppHeader
    },
   data() {
        return {
            memberVo: {
                no: this.$store.state.authUser.no,
                period: ""
            }
        };
    },
    methods: {
        register(){
            console.log("register");
            console.log(this.memberVo);
            this.$router.push("/gym/payment/"+this.memberVo.period);
        }
    },
    created() { 

    }
};
</script>
<style>

</style>