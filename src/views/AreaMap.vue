<template>
    <div class="area-map-container">
        <div class="map"></div>
        <realtime-records :class="openCloseClass" />
        <div class="tools-list">
            <div class="control-tools">
                <a>数据信息</a>
                <a @click="toggleOpenClose"><div class="open-close" :class="{'closed':closed}"></div></a>
                <a>3D</a>
            </div>
            <div class="check-tools">
                <div  class='mapcheck customcheckbox' >
                    <label><input type="checkbox"><i class="spot"></i> 摄像头 </label>
                </div>
                <div  class='mapcheck customcheckbox'>
                    <label><input type="checkbox"><i class="spot"></i> 人防分布 </label>
                </div>
                <div  class='mapcheck customcheckbox' >
                    <label><input type="checkbox"><i class="spot"></i> 对讲门禁 </label>
                </div>
                <div  class='mapcheck customcheckbox' >
                    <label><input type="checkbox"><i class="spot"></i> 车场记录 </label>
                </div>
                <div  class='mapcheck customcheckbox' >
                    <label><input type="checkbox"><i class="spot"></i> 周边配套 </label>
                </div>
                <div  class='mapcheck customcheckbox'>
                    <label><input type="checkbox"><i class="spot"></i> 安防巡更路线 </label>
                </div>
            </div>
        </div>
        <div class="left-win-box" :class="openCloseClass">
            <!-- 一标N实 -->
            <div class="leftsmallbox yibiaonshi">
                <h2>一标N实</h2>
                <div class="content-container">

                </div>
            </div>
            <div class="split-box">&nbsp;</div>
            <!-- 三防统计 -->
            <div class="leftsmallbox sanfangtongji">
                <h2>三防统计</h2>
                <div class="content-container" style="height: 216px">
                    <div ref="sanfangtongjiinfo" style="width: 100%; height: 100%;">

                    </div>
                </div>
            </div>
            <div class="split-box">&nbsp;</div>
            <!-- 今日实有警情事件及处置情况 -->
            <div class="leftsmallbox alarmtoday">
                <h2>今日实有警情事件及处置情况</h2>
                <div class="content-container">
                    <div class="status-list">
                        <span class="handled">已处置</span>
                        <span class="un-handled">未处置</span>
                    </div>
                    <div class="alarm-data-list">
                        <div class="alarm-item">
                            <div class="alarm-tit">人员黑名单</div>
                            <div class="virtual-total">
                                <span class="handled" style="width: 60%;">186</span>
                                <span class="un-handled">43</span>
                            </div>
                        </div>
                        <div class="alarm-item">
                            <div class="alarm-tit">车辆黑名单</div>
                            <div class="virtual-total">
                                <span class="handled">32</span>
                                <span class="un-handled">12</span>
                            </div>
                        </div>
                        <div class="alarm-item">
                            <div class="alarm-tit">周界预警</div>
                            <div class="virtual-total">
                                <span class="handled">48</span>
                                <span class="un-handled">23</span>
                            </div>
                        </div>
                        <div class="alarm-item">
                            <div class="alarm-tit">陌生人尾随预警</div>
                            <div class="virtual-total">
                                <span class="handled">48</span>
                                <span class="un-handled">23</span>
                            </div>
                        </div>
                        <div class="alarm-item">
                            <div class="alarm-tit">车辆黑名单</div>
                            <div class="virtual-total">
                                <span class="handled">32</span>
                                <span class="un-handled">12</span>
                            </div>
                        </div>
                        <div class="alarm-item">
                            <div class="alarm-tit">周界预警</div>
                            <div class="virtual-total">
                                <span class="handled">48</span>
                                <span class="un-handled">23</span>
                            </div>
                        </div>
                        <div class="alarm-item">
                            <div class="alarm-tit">陌生人尾随预警</div>
                            <div class="virtual-total">
                                <span class="handled">48</span>
                                <span class="un-handled">23</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../assets/theme/common.styl'
    import '../assets/theme/theme-light/index.styl'

    import RealtimeRecords from '../components/RealtimeRecords'
    import echarts from 'echarts'
    export default {
        data() {
            return {
                closed: false,
                sanfangChart: null
            }
        },
        computed: {
            openCloseClass() {
                return this.closed? 'closed':'opened'
            }
        },
        mounted() {
            this.sanfangChartInit()
        },
        methods: {
            toggleOpenClose() {
                this.closed = !this.closed
            },
            sanfangChartInit() {
                var option = {
                    // title: {
                    //     text: '人防',
                    //     left: 'center',
                    //     top: '30%',
                    //     textStyle: {
                    //         fontWeight: 'normal',
                    //         color: '#1e88e5',
                    //         fontSize: '14'
                    //     },
                    //     subtext:'120',
                    //     subtextStyle: {
                    //         fontWeight: 'normal',
                    //         color: '#ffffff',
                    //         fontSize: '22'
                    //     }
                    // },
                    tooltip: {
                        trigger: 'none',
                        //trigger: 'item',
                        formatter: "{b}<br>{c} ({d}%)",
                        //position: 'inside'
                    },
                    color: ['#73fff3','#2f46f0','#00a8ff'],
                    legend: {
                        bottom:'-5',
                        textStyle:{
                            color:'white'
                        },
                        x: 'center',
                        data:[
                            {name:'人防',icon:'circle'},
                            {name:'物防',icon:'circle'},
                            {name:'技防',icon:'circle'}
                        ]
                    },
                    series: [                        
                        {
                            type:'pie',
                            hoverOffset:5,
                            center: ['50%','40%'],
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            zlevel: 1,
                            label: {
                                show: false,
                                position: 'center',
                                lineHeight:20,                                
                                formatter: '{n|{b}}\n{w|{c}}',
                                rich: {
                                    n: {   
                                        color: '#1e88e5',                                     
                                        fontSize: '12'
                                    },
                                    w: {
                                        fontSize: '22',
                                        color: '#fff'
                                    }
                                }                               
                            },
                            emphasis: {
                                label: {
                                    show: true
                                }
                            },
                            labelLine: {
                                show: false
                            },
                            data:[
                                {value:335, name:'人防'},
                                {value:310, name:'物防'},
                                {value:234, name:'技防'}
                            ]
                        },
                        {
                            type:'pie',
                            hoverOffset:5,
                            center: ['50%','40%'],
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                color: '#fff',
                                formatter: '{b}\n{d}%'
                            },
                            data:[
                                {value:335, name:'人防'},
                                {value:310, name:'物防'},
                                {value:234, name:'技防'}
                            ]
                        }
                    ]
                }
                var sanfangechart =  echarts.init(this.$refs.sanfangtongjiinfo);
                sanfangechart.setOption(option, true)
                this.sanfangChart = sanfangechart
                let _this = this
                // this.sanfangChart.on('mouseover', function (params) {
                //     console.log(params)
                //     setTimeout(()=>{
                //         _this.sanfangChart.setOption({title:{text:`${params.name}`,subtext:`${params.value}`}})
                //     },20)                    
                // })
            }
        },
        components: {
            RealtimeRecords
        }
    }
</script>