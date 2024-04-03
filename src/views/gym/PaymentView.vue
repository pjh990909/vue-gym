<template>
    <div id="payAll">
        <h1 id="payTitle">PAYMENT</h1>
        <h2 id="paySubTitle">이용권 및 PT결제</h2>
        <div id="payInfo">
            <ul id="payList">
                <li class="payList1">결제할 이용권</li> 
                <span class="payInfo1">{{ month }} 이용권</span>
                <li class="payList2">가격</li> 
                <span class="payInfo2">{{ memberVo.price }} 원</span>
                <li class="payList3">회원권 신청일</li> 
                <span class="payInfo3">{{ regDate }}</span>
            </ul>
        </div>
        <div>
            <input type="checkbox" class="payCheckbox1">
            <label id="check1">개인정보 처리방침에 동의합니다.</label> 
        </div>
        <div>
            <input type="checkbox" class="payCheckbox2">
            <label id="check2">청약철회 약관에 동의합니다.</label>
        </div>
        <button id="payBtn">결제 요청하기</button>
        <div class="footer1">CodeCrafters</div>
        <div class="footer2">copyright (c) all rights Reserved.</div>
    </div>
</template>


<script>
//import axios from 'axios';
import '@/assets/css/gym/payment.css'
export default {
    name: "PaymentView",
    components: {},
    data() {
        return {
            memberVo: {
                no: this.$store.state.authUser.no,
                period: this.$route.params.period,
                price: ""
            },
            month: "",
            regDate: ""
        };
    },
    methods: {
        getInfo(){
            console.log(this.memberVo.period);
            
            let date = new Date();
            let koreanDate = date.toLocaleString('ko-KR', { year: 'numeric', month: 'numeric', day: 'numeric'});
            this.regDate = koreanDate;

            if(this.memberVo.period == 30){
                console.log("30일");
                this.month = "1개월";
                this.memberVo.price = 110000;
            } else if(this.memberVo.period == 90){
                console.log("90일");
                this.month = "3개월";
                this.memberVo.price = 210000;
            } else if(this.memberVo.period == 180){
                console.log("180일");
                this.month = "6개월";
                this.memberVo.price = 350000;
            } else if(this.memberVo.period == 365){
                console.log("365일");
                this.month = "12개월";
                this.memberVo.price = 550000;
            }
        }
    },
    created(){
        this.getInfo();
    },
    
};
</script>


<style></style>