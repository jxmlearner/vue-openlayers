<template>
    <div class="statistic-data">
        <div>
			<div class="headtitle">实有小区</div>
			<div class="contentdiv">00013925</div>
		</div>
		<div>
			<div class="headtitle">实有房屋</div>
			<div class="contentdiv">00263925</div>
		</div>
		<div>
			<div class="headtitle">实有人口</div>
			<div class="contentdiv">10233227</div>
		</div>
		<div>
			<div class="headtitle">实有车辆</div>
			<div class="contentdiv">1023245</div>
		</div>
		<div>
			<div class="headtitle">感知设备</div>
			<div class="contentdiv">21332998</div>
		</div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
.statistic-data {
	bottom: 10px;
	position: absolute;
	z-index: 10;
    display: flex;
    margin-left: 50%;
    transform: translateX(-50%);
}
.statistic-data>div {
    margin-right: 20px;
}
.statistic-data>div:last-child {
    margin-right: 0;
}
.headtitle {
    height: 22px;
    line-height: 22px;
    color: white;
    font-size: 14px;
    font-family: '微软雅黑';
    font-weight: bold;
}
.contentdiv {
    height: 30px;
    line-height: 30px;
	width: 140px;
	background-image: url('../assets/images/infodiv.png');
	background-size: 100% 100%;
    text-align: center;
	font-family: 'data-font';
	color: rgb(199, 233, 10);
	font-size: 20px;
	font-weight: bold;
    letter-spacing: 6px;
    padding-left: 5px;
    text-shadow:2px 2px 8px rgba(30,136,229,1),-2px -2px 8px rgba(30,136,229,1);
}
</style>