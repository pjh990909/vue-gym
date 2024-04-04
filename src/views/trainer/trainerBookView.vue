<template>
    <div id="MbCommentList">
        <div>
            <h1 id="Mbtxt">MEMBER<br>LIST</h1>
        </div>
        <div>
            <p id="CallMb"><strong id="Mb">{{memberVo.name}}</strong> 회원님</p>
            <p id="Hp">핸드폰 번호: {{ memberVo.hp }}</p>
        </div>
        
        <div>
            <table id="ptAll">
                
                    <tr id="ptInfo">
                        <th class="tab2">받은PT횟수</th>
                        <td class="tab3">{{ ptVo.ptTotal }}</td>
                        <th class="tab2">전체PT횟수</th>
                        <td class="tab3">{{ ptVo.ptCount}}</td>
                    </tr>
            </table>
            
            <div>
                <textarea></textarea>
                <button type="submit">등록</button>
            </div>
            
            
            <table id="dateCmt" v-bind:key="i" v-for="(lessonVo, i) in lessonList">    
                <tbody >
                    <!-- <div v-bind:key="i" v-for="(lessonVo, i) in lessonList"> -->
                        <tr>
                            <td colspan="2" class="tab2">PT받은날짜</td>
                            <td colspan="2" class="tab3">{{lessonVo.lDate}}</td>
                        </tr>
                        
                        <tr>
                            <td colspan="2" class="tab2">COMMENT</td>
                            <td colspan="2" class="tab3">{{lessonVo.comment}}</td>
                        </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import '@/assets/css/MemberList.css'
import axios from 'axios';
export default {
    name: 'MemberListView',
    components: {

    },
    data() {
        return {
            memberVo: {
                name: "",
                hp: "",
            },
            ptVo: {
                ptTotal: "",
                ptCount: ""
            },
            lessonList: [],
            lessonVo: {
                lDate: "",
                comment: ""
            }
            
        };
    },    
    methods: {
        getList(){
            console.log("commentlist");
            console.log(this.memberVo);
            axios({
            method: "get",
            url: "http://localhost:9000/api/member/lessonlist",
            headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: "Bearer " + this.$store.state.token
            },
            responseType: "json"
        }).then(response => {
            console.log(response.data);
           
            this.memberVo = response.data.apiData.memberVo;
            this.ptVo = response.data.apiData.ptInfoList[0];
            this.lessonList=response.data.apiData.mblessonList;
           
        }).catch(error => {
            console.log(error);
        });
        }

    },
    created(){
    this.getList();
    }    
    
};
</script>