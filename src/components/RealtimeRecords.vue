<template>
    <div class="realtime-records">
        <h2>实时记录</h2>
        <div class="records">
            <ul class="tab-header">
                <li v-for="(tab,index) in tabs" :class="{'active': curTabIndex === index}" @click="changeTab(index)"><a>{{tab}}</a></li>
            </ul>
            <div class="tab-content">                
                <div class="content-item door-content" :class="{'active': curTabIndex === 0}">
                    <div class="data-info">今日开门记录：<span>27,164<i>次</i></span></div>
                    <div class="record-list">                      
                        <div class="record-item">
                            <div class="avatar">
                                <img src="images/avatar01.png" />
                                <div class="text">租客</div>
                            </div>
                            <div class="item-detail">
                                <div class="detail-item">
                                    <span class="tit">开门日期</span>
                                    <span class="info">2018/12/12  15:42:20</span>
                                </div>                                
                                <div class="detail-item">
                                    <span class="tit">姓名</span>
                                    <span class="info">周勇</span>
                                </div>                                
                                <div class="detail-item">
                                    <span class="tit">证件</span>
                                    <span class="info">520203196409210513</span>
                                </div>                                
                                <div class="detail-item">
                                    <span class="tit">开门方式</span>
                                    <span class="info">刷IC卡开门</span>
                                </div>                                
                                <div class="detail-item">
                                    <span class="tit">门禁ID</span>
                                    <span class="info">14栋2单元</span>
                                </div>                                
                            </div>
                        </div>
                        <div class="record-item">
                            <div class="avatar">
                                <img src="images/avatar01.png" />
                                <div class="text">租客</div>
                            </div>
                            <div class="item-detail">
                                <div class="detail-item">
                                    <span class="tit">开门日期</span>
                                    <span class="info">2018/12/12  15:42:20</span>
                                </div>                                
                                <div class="detail-item">
                                    <span class="tit">姓名</span>
                                    <span class="info">周勇</span>
                                </div>                                
                                <div class="detail-item">
                                    <span class="tit">证件</span>
                                    <span class="info">520203196409210513</span>
                                </div>                                
                                <div class="detail-item">
                                    <span class="tit">开门方式</span>
                                    <span class="info">刷IC卡开门</span>
                                </div>                                
                                <div class="detail-item">
                                    <span class="tit">门禁ID</span>
                                    <span class="info">14栋2单元</span>
                                </div>                                
                            </div>
                        </div>
                        <div class="record-item">
                            <div class="avatar">
                                <img src="images/avatar01.png" />
                                <div class="text">租客</div>
                            </div>
                            <div class="item-detail">
                                <div class="detail-item">
                                    <span class="tit">开门日期</span>
                                    <span class="info">2018/12/12  15:42:20</span>
                                </div>                                
                                <div class="detail-item">
                                    <span class="tit">姓名</span>
                                    <span class="info">周勇</span>
                                </div>                                
                                <div class="detail-item">
                                    <span class="tit">证件</span>
                                    <span class="info">520203196409210513</span>
                                </div>                                
                                <div class="detail-item">
                                    <span class="tit">开门方式</span>
                                    <span class="info">刷IC卡开门</span>
                                </div>                                
                                <div class="detail-item">
                                    <span class="tit">门禁ID</span>
                                    <span class="info">14栋2单元</span>
                                </div>                                
                            </div>
                        </div>
                        <div class="record-item">
                            <div class="avatar">
                                <img src="images/avatar01.png" />
                                <div class="text">租客</div>
                            </div>
                            <div class="item-detail">
                                <div class="detail-item">
                                    <span class="tit">开门日期</span>
                                    <span class="info">2018/12/12  15:42:20</span>
                                </div>                                
                                <div class="detail-item">
                                    <span class="tit">姓名</span>
                                    <span class="info">周勇</span>
                                </div>                                
                                <div class="detail-item">
                                    <span class="tit">证件</span>
                                    <span class="info">520203196409210513</span>
                                </div>                                
                                <div class="detail-item">
                                    <span class="tit">开门方式</span>
                                    <span class="info">刷IC卡开门</span>
                                </div>                                
                                <div class="detail-item">
                                    <span class="tit">门禁ID</span>
                                    <span class="info">14栋2单元</span>
                                </div>                                
                            </div>
                        </div>
                        <div class="record-item">
                            <div class="avatar">
                                <img src="images/avatar01.png" />
                                <div class="text">租客</div>
                            </div>
                            <div class="item-detail">
                                <div class="detail-item">
                                    <span class="tit">开门日期</span>
                                    <span class="info">2018/12/12  15:42:20</span>
                                </div>                                
                                <div class="detail-item">
                                    <span class="tit">姓名</span>
                                    <span class="info">周勇</span>
                                </div>                                
                                <div class="detail-item">
                                    <span class="tit">证件</span>
                                    <span class="info">520203196409210513</span>
                                </div>                                
                                <div class="detail-item">
                                    <span class="tit">开门方式</span>
                                    <span class="info">刷IC卡开门</span>
                                </div>                                
                                <div class="detail-item">
                                    <span class="tit">门禁ID</span>
                                    <span class="info">14栋2单元</span>
                                </div>                                
                            </div>
                        </div>
                        <div class="record-item">
                            <div class="avatar">
                                <img src="images/avatar01.png" />
                                <div class="text">租客</div>
                            </div>
                            <div class="item-detail">
                                <div class="detail-item">
                                    <span class="tit">开门日期</span>
                                    <span class="info">2018/12/12  15:42:20</span>
                                </div>                                
                                <div class="detail-item">
                                    <span class="tit">姓名</span>
                                    <span class="info">周勇</span>
                                </div>                                
                                <div class="detail-item">
                                    <span class="tit">证件</span>
                                    <span class="info">520203196409210513</span>
                                </div>                                
                                <div class="detail-item">
                                    <span class="tit">开门方式</span>
                                    <span class="info">刷IC卡开门</span>
                                </div>                                
                                <div class="detail-item">
                                    <span class="tit">门禁ID</span>
                                    <span class="info">14栋2单元</span>
                                </div>                                
                            </div>
                        </div>
                        <div class="record-item">
                            <div class="avatar">
                                <img src="images/avatar01.png" />
                                <div class="text">租客</div>
                            </div>
                            <div class="item-detail">
                                <div class="detail-item">
                                    <span class="tit">开门日期</span>
                                    <span class="info">2018/12/12  15:42:20</span>
                                </div>                                
                                <div class="detail-item">
                                    <span class="tit">姓名</span>
                                    <span class="info">周勇</span>
                                </div>                                
                                <div class="detail-item">
                                    <span class="tit">证件</span>
                                    <span class="info">520203196409210513</span>
                                </div>                                
                                <div class="detail-item">
                                    <span class="tit">开门方式</span>
                                    <span class="info">刷IC卡开门</span>
                                </div>                                
                                <div class="detail-item">
                                    <span class="tit">门禁ID</span>
                                    <span class="info">14栋2单元</span>
                                </div>                                
                            </div>
                        </div>
                        <div class="record-item">
                            <div class="avatar">
                                <img src="images/avatar01.png" />
                                <div class="text">租客</div>
                            </div>
                            <div class="item-detail">
                                <div class="detail-item">
                                    <span class="tit">开门日期</span>
                                    <span class="info">2018/12/12  15:42:20</span>
                                </div>                                
                                <div class="detail-item">
                                    <span class="tit">姓名</span>
                                    <span class="info">周勇</span>
                                </div>                                
                                <div class="detail-item">
                                    <span class="tit">证件</span>
                                    <span class="info">520203196409210513</span>
                                </div>                                
                                <div class="detail-item">
                                    <span class="tit">开门方式</span>
                                    <span class="info">刷IC卡开门</span>
                                </div>                                
                                <div class="detail-item">
                                    <span class="tit">门禁ID</span>
                                    <span class="info">14栋2单元</span>
                                </div>                                
                            </div>
                        </div>
                        <div class="record-item">
                            <div class="avatar">
                                <img src="images/avatar01.png" />
                                <div class="text">租客</div>
                            </div>
                            <div class="item-detail">
                                <div class="detail-item">
                                    <span class="tit">开门日期</span>
                                    <span class="info">2018/12/12  15:42:20</span>
                                </div>                                
                                <div class="detail-item">
                                    <span class="tit">姓名</span>
                                    <span class="info">周勇</span>
                                </div>                                
                                <div class="detail-item">
                                    <span class="tit">证件</span>
                                    <span class="info">520203196409210513</span>
                                </div>                                
                                <div class="detail-item">
                                    <span class="tit">开门方式</span>
                                    <span class="info">刷IC卡开门</span>
                                </div>                                
                                <div class="detail-item">
                                    <span class="tit">门禁ID</span>
                                    <span class="info">14栋2单元</span>
                                </div>                                
                            </div>
                        </div>
                        <div class="record-item">
                            <div class="avatar">
                                <img src="images/avatar01.png" />
                                <div class="text">租客</div>
                            </div>
                            <div class="item-detail">
                                <div class="detail-item">
                                    <span class="tit">开门日期</span>
                                    <span class="info">2018/12/12  15:42:20</span>
                                </div>                                
                                <div class="detail-item">
                                    <span class="tit">姓名</span>
                                    <span class="info">周勇</span>
                                </div>                                
                                <div class="detail-item">
                                    <span class="tit">证件</span>
                                    <span class="info">520203196409210513</span>
                                </div>                                
                                <div class="detail-item">
                                    <span class="tit">开门方式</span>
                                    <span class="info">刷IC卡开门</span>
                                </div>                                
                                <div class="detail-item">
                                    <span class="tit">门禁ID</span>
                                    <span class="info">14栋2单元</span>
                                </div>                                
                            </div>
                        </div>
                        <div class="record-item">
                            <div class="avatar">
                                <img src="images/avatar01.png" />
                                <div class="text">租客</div>
                            </div>
                            <div class="item-detail">
                                <div class="detail-item">
                                    <span class="tit">开门日期</span>
                                    <span class="info">2018/12/12  15:42:20</span>
                                </div>                                
                                <div class="detail-item">
                                    <span class="tit">姓名</span>
                                    <span class="info">周勇</span>
                                </div>                                
                                <div class="detail-item">
                                    <span class="tit">证件</span>
                                    <span class="info">520203196409210513</span>
                                </div>                                
                                <div class="detail-item">
                                    <span class="tit">开门方式</span>
                                    <span class="info">刷IC卡开门</span>
                                </div>                                
                                <div class="detail-item">
                                    <span class="tit">门禁ID</span>
                                    <span class="info">14栋2单元</span>
                                </div>                                
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-item car-content" :class="{'active': curTabIndex === 1}">车行</div>
                <div class="content-item visit-content" :class="{'active': curTabIndex === 2}">访客</div>                
                <div class="content-item alarm-content" :class="{'active': curTabIndex === 3}">预警</div>
                <div class="content-item face-content" :class="{'active': curTabIndex === 4}">人脸</div>
            </div>
        </div> 
        <div class="realtime-footer">
            <a class="arrow-down"></a>
        </div>         
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tabs: ['开门','车行','访客','预警','人脸'],
                curTabIndex: 0
            }
        },
        methods: {
            changeTab(idx) {
                this.curTabIndex = idx
            }
        }
    }
</script>