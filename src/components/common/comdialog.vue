<template>
    <div class="comdialog">
        <div class="header">
            <div class="title">
                <slot name="header">
                    标题
                </slot>
            </div> 
            <div class="headerright">
                <i class="icon iconfont icon-ellipsis"></i>
                <i class="icon iconfont icon-close" @click="closeComDialog"></i>
            </div>           
        </div>        
        <slot>
            <div class="dialogcontent">
                dialog default content
            </div>
        </slot>
    </div>
</template>

<script>
    export default {
        methods: {
            closeComDialog() {
                this.$emit('closeComDialog')
            }
        }
    }
</script>

<style scoped>
.comdialog {
    height: 100%;
    background: none;   
    color: #fff;
    border: 1px solid rgba(3,92,176,1)
}
.header {
    height: 26px;
    line-height: 26px;
    font-size: 12px;
    padding: 0 8px;
    display: flex;
    align-items: center;
    justify-content:space-between;
    background-color: rgba(1,104,203,.7);
}
.headerright {
    color: #fff;
}
.headerright>i {
    cursor: pointer;
    margin-left: 3px;
}
</style>