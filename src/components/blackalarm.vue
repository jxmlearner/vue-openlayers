<template>
    <div class="comDialogWin blackalarm" v-show="comDialogShowFlag">
        <comdialog @closeComDialog="closeWin">
            <template slot="header">涉毒人员预警</template>
            <div class="blackalarm-box">
                <div class="blackalarm-image">
                    <img :src="'images/yandengfeng.jpg'"/>
                </div>
                <div class="blackalarm-content">
                    <div>王强（男）</div>
                    <div>13723949292</div>
                    <div>2019/01/18 11:03:30</div>
                    <div>山东省菏泽市长江路</div>
                </div>
            </div>
        </comdialog>
    </div>
</template>

<script>
    import comdialog from './common/comdialog'

    export default {
        props: {
            showflag: {
                type: Boolean,
                default: function () {
                    return false
                }
            }
        },
        computed: {
            comDialogShowFlag() {
                return this.showflag
            }
        },
        methods: {
            closeWin() {
                this.$emit('close','blackAlarmWinStatus')
            }
        },
        components:{
            comdialog
        },
        
    }
</script>

<style scoped lang="stylus">
.blackalarm{
	top:80px;
	right:10px;
	width:260px;
	position: absolute;
    z-index: 10;
    background: url('../assets/images/blackalarm_bg.png') repeat;
}
>>>.comdialog{
    border: 1px solid rgba(255,26,32,1);
    .header {
        background-color: transparent;
    }
}
.blackalarm-box {
    display: flex;
    border-top: 1px solid rgba(216,12,2,.24);
}
.blackalarm-image{
    width:110px;
    height: 130px;
    padding: 15px;
}
.blackalarm-image img {
    width: 100%;
    height: 100%;
}
.blackalarm-content{
    flex: 1;
    color: #fff;
    font-size: 12px;
    line-height: 26px;
    padding-top: 10px;
}
</style>