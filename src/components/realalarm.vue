<template>
    <div class="comDialogWin realalarm" v-show="comDialogShowFlag">
        <comdialog @closeComDialog="closeRealWin">
            <template slot="header">实时新增</template>
            <div class="wrap-box">
                <div class="realalarmdiv">
                    <div class="inner-box">
                        <div>新增预警</div>
                        <div>
                            <img id="realalarmdiv-image" :src="'images/yandengfeng.jpg'"/>
                        </div>
                        <div>疑似陌生人尾随告警</div>
                        <div>山东省东营市东营区</div>
                        <div>金水北区</div>
                        <div>2019/01/18 11:03:30</div>
                    </div>                    
                </div>              
                <div class="realalarmdiv">
                    <div class="inner-box">
                        <div>新增人口</div>
                        <div>
                            <img id="realalarmdiv-image" :src="'images/yandengfeng.jpg'"/>
                        </div>
                        <div>王强（男）</div>
                        <div>3423234522223444222</div>
                        <div>山东省东营市东营区</div>
                        <div>金水北区</div>
                        <div>2019/01/18 11:03:30</div>
                    </div>                    
                </div>              
                <div class="realalarmdiv">
                    <div class="inner-box">
                        <div>新增小区</div>
                        <div>
                            <img id="realalarmdiv-image" :src="'images/yandengfeng.jpg'"/>
                        </div>
                        <div>金水北区</div>
                        <div>封闭式小区</div>
                        <div>山东省东营市东营区</div>
                        <div>东营市金水路100号</div>
                        <div>2019/01/18 11:03:30</div>
                    </div>                    
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
            closeRealWin() {
                this.$emit('close','realTimeWinStatus')
            }
        },
        components:{
            comdialog
        }        
    }
</script>

<style scoped>
.realalarm{
	top:240px;
	right:100px;
	width:567px;
	position: absolute;
    z-index: 10;
    font-size: 12px;
}
.wrap-box {
    display: flex;
    background: none;
    border-top: 1px solid rgba(2,144,216,.24);
    box-shadow: 0px 0px 30px 14px rgba(0,66,255,.32) inset;
}
.realalarmdiv{
    width: 160px;
    padding: 15px;
    flex:1;
    background: none;
    border-right: 1px solid rgba(2,144,216,.24);
}
.realalarmdiv:last-child {
    border-right: none;
}
.realalarmdiv:hover .inner-box {
    background: rgb(45,136,251);
    color:#fff;
}
.inner-box {
    background: rgba(1,40,103,1);
    border: 1px solid rgba(1,64,123,1);
    padding: 10px;
    position: relative;
    line-height: 18px;
    height: 100%;
}
#realalarmdiv-image{
    width:130px;
    height: 85px;
}
</style>