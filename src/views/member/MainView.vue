<template>
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
                                <td id="yyyy">{{ memberVo.regDate }}</td>
                            </tr>
                            <tr>
                                <td id="tttt">회원권 만료일</td>
                                <td id="yyyy">{{ memberVo.deadline }}</td>
                            </tr>
                            <tr>
                                <td id="tttt">남은 PT횟수</td>
                                <td id="yyyy" class="yyyt">
                                    {{memberVo.ptCount}}회
                                    <button id="tkdtp">상세</button>
                                </td>
                            </tr>
                            <tr>
                                <td id="tttt">나의 강사님</td>
                                <td id="yyyy">{{ memberVo.trainerName }} 강사님</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
            </div>
            <div class="clearfix box99">
                <div>
                    <button id="dlqtlf">입실</button>
                </div>
                <div id="xpdlqmf">
                    <table>
                        <tbody>
                            <tr>
                                <td id="t1">입실시각</td>
                                <td id="t2">00-00-00:00</td>
                            </tr>
                            <tr>
                                <td id="t1">퇴실시각</td>
                                <td id="t2" >00-00-00:00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <button id="box33">트레이너<br>등록</button><button id="box33">전체<br>회원</button><button
                    id="box34">나의<br>회원</button>
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
import axios from 'axios';
export default {
    emits: ['point'],
    name: 'memberMainView',
    components: {},
    data() {
        return {
        memberVo: {
            name: "",
            regDate: "",
            deadline: "",
            ptCount: "",
            trainerName: "",
            lockerNo: ""
        },
        attendVo: {
            leaveTime: "",
            entryTime: ""
        }
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
            console.log("result: success");
            this.memberVo = response.data.apiData;
            } else {
            console.log(response.data.message);
            alert("로그인 하세요");
            this.$router.push("/member/login");
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