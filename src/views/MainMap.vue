<template>
    <div class="map-container">
        <div class="map" ref="map"></div>
        <!-- <div class="maptools">
            <a @click="drawRectangle"><i class="iconfont icon-rectangle"></i>画矩形</a>
            <a @click="clearDraw"><i class="iconfont icon-custom-clear"></i>清除</a>
        </div> -->
        <div class="operation-btns">
            <a @click="openBlackAlarm">黑名单预警</a>
            <a @click="openRealTimeCreate">实时数据</a>
            <router-link to="/areamap">三维地图</router-link>
        </div>
        <div class="maptype" @click="changemap" ref="maptype"> <!-- 右下角街景和影像地图切换 -->
            <span ref="maptypetext">街景</span>
        </div>
        <div class="operation-tools">  <!-- 右下角的操作工具栏 -->
            <a class="rect-search" title="矩形搜索" @click="drawRectangle"></a>
            <a @click="clearDraw" title="清除矩形"><i class="iconfont icon-custom-clear"></i></a>
            <a title="2D|3D切换">2D</a>
            <a class="skywatch" title="打开立体云客户端"></a>
            <div class="zoom-box">
                <a class="zoom-plus" title="放大" @click="zoomout"></a>
                <a class="zoom-reduce" title="缩小" @click="zoomin"></a>
            </div>
        </div>
        <!-- 统计数据 -->
        <statistic-data />
        <blackalarm :showflag="blackAlarmWinStatus" @close="closeComDialog"/>
        <realalarm :showflag="realTimeWinStatus" @close="closeComDialog" />
        <div class="mouseposition-box" ref="mouseposition"></div> <!--当前光标位置-->
        <div class="ol-popup" ref="popup"> <!-- 弹出窗口 -->
            <a href="#" ref="popupCloser" class="ol-popup-closer" @click="closePopup"></a>
            <div ref="popupContent">{{popupObj.content}}</div>
        </div>
    </div>
</template>

<script>
    import 'ol/ol.css'
    import {Map,View} from 'ol'
    import Feature from 'ol/Feature'
    import Point from 'ol/geom/Point'
    import TileLayer from 'ol/layer/Tile'
    import VectorLayer from 'ol/layer/Vector'
    import TileArcGISRest from 'ol/source/TileArcGISRest'
    import XYZ from 'ol/source/XYZ'
    import { Vector as VectorSource } from 'ol/source'
    import Draw, { createBox } from 'ol/interaction/Draw'
    import { Circle as CircleStyle, Icon, Style, Fill, Stroke, Text } from 'ol/style'
    import MousePosition from 'ol/control/MousePosition'   // 当前鼠标位置
    import {defaults as defaultControls} from 'ol/control'
    import { format } from 'ol/coordinate'
    import Overlay from 'ol/Overlay'  //弹出窗和点击事件
    import Select from 'ol/interaction/Select'
    import {click, pointerMove, altKeyOnly} from 'ol/events/condition'
    import { projection, centerx, centery, zoom, streetmapurl, imagemapurl, mapmode } from '../mapconfig'

    import StatisticData from '../components/StatisticData'
    import realalarm from '../components/realalarm'
    import blackalarm from '../components/blackalarm'
    import MapApi from '../API/mapapi'
    export default {
        data() {
            return {
                map: null,
                view: new View({
                    projection,
                    center: [centerx, centery],
                    zoom
                }),
                pointIcon: {
                    unitpoint: 'images/unit.png',
                    unitpoints: 'images/units.png',
                    video: 'images/video.png',
                    null: ''
                },
                Iconstyle: feature => {
                    return [
                        new Style({
                            stroke: new Stroke({
                                color: 'red',
                                width: 2
                            }),
                            image: new Icon({
                                offset: [0, 0],
                                opacity: 1.0,
                                rotateWithView: true,
                                rotation: 0.0,
                                scale: 1.0,
                                size: [60, 40],
                                anchor: [0.1, 0],
                                anchorXUnits: 'fraction',
                                anchorYUnits: 'pixels',
                                src: this.pointIcon[feature.get('type')]
                            })
                        })
                    ]
                },
                vectorSource: new VectorSource(),
                vectorLayer: null,
                drawSource: new VectorSource({}),
                drawLayer: null,
                streetmapLayer:null,        //街景图层
                imagemapLayer: null,        //影像图层
                mousepostionCtrl: null,
                popup: null,
                popupObj: {          // 弹出层的数据对象
                    name: '',
                    content: ''
                },
                selectInteraction: new Select(),
                blackAlarmWinStatus: false,  //黑名单窗口显示与否
                realTimeWinStatus: false,  //实时新增窗口显示与否
            }
        },
        mounted() {
            this.initMap()
            this.addVideo()
            this.getAreaData()
        },
        methods: {
            initMap() {  //初始化地图
                if (mapmode == 0) {  //如果是离线
                    this.streetmapLayer = new TileLayer({
                        preload: Infinity,
                        source: new XYZ({
                            projection: 'EPSG:3857',
                            url: streetmapurl
                        })
                    })
                    this.imagemapLayer = new TileLayer({
                        visible: false,
                        preload: Infinity,
                        source: new XYZ({
                            projection: 'EPSG:3857',
                            url: imagemapurl
                        })
                    })
                } else {  //如果是在线使用ArcGIS的在线地图服务
                    this.streetmapLayer = new TileLayer({
                        preload: Infinity,
                        source: new TileArcGISRest({
                            url: streetmapurl
                        })
                    })
                    this.imagemapLayer = new TileLayer({
                        visible: false,
                        preload: Infinity,
                        source: new TileArcGISRest({
                            url: imagemapurl
                        })
                    })
                }
                this.mousepostionCtrl = new MousePosition({
                    coordinateFormat: function(coordinate) {
                        return format(coordinate, '经度: {x}, 纬度: {y}', 4)
                    },
                    projection: 'EPSG:4326',
                    className: 'mouseposition',
                    target: this.$refs.mouseposition,
                    undefinedHTML: '&nbsp;'
                })
                this.popup = new Overlay({
                    element: this.$refs.popup,
                    autoPan: true,
                    autoPanAnimation: {
                        duration: 250
                    }
                })
                this.vectorLayer = new VectorLayer({
                    source: this.vectorSource,
                    zIndex: 30
                })
                this.drawLayer = new VectorLayer({
                    source: this.drawSource
                })
                const map = new Map({
                    controls: defaultControls().extend([this.mousepostionCtrl]),
                    target: this.$refs.map,
                    layers: [ this.streetmapLayer,this.imagemapLayer, this.drawLayer, this.vectorLayer ],
                    overlays: [this.popup],
                    view: this.view
                })
                this.map = map
                /* 鼠标停放事件 */
                this.map.on('pointermove', e => {
                    if (e.dragging) {
                        return
                    }
                    var pixel = this.map.getEventPixel(e.originalEvent)
                    this.mouseoverevt(pixel)
                })
                this.map.addInteraction(this.selectInteraction);
                let _this = this
                this.selectInteraction.on('select', function(e) {
                    let feature = e.target.getFeatures().getArray()[0]
                    // console.log(feature)
                    if(!feature) return
                    var coordinates = feature.getGeometry().getCoordinates()
                    var layername = feature.get('layername')
                    // console.log(layername)
                    switch (layername) {
                        case 'videolayer':                            
                            _this.popup.setPosition(coordinates)
                            let name = feature.get('name')
                            _this.popupObj = {
                                name,
                                content: name
                            }
                            break
                    }
                    _this.selectInteraction.getFeatures().clear()
                })
            },
            changemap() { //切换街景和影像地图
                var mapname = this.$refs.maptypetext.innerHTML      
                if (mapname == '街景') { 
                    this.imagemapLayer.setVisible(true)
                    this.streetmapLayer.setVisible(false)                        
                    this.$refs.maptypetext.innerHTML='影像'
                    this.$refs.maptype.style.backgroundPosition = "0 -60px";
                } else if (mapname == '影像') {
                    this.streetmapLayer.setVisible(true)
                    this.imagemapLayer.setVisible(false)                                          
                    this.$refs.maptypetext.innerHTML='街景'
                    this.$refs.maptype.style.backgroundPosition = "0 0";
                }
            },
            drawRectangle() {
                this.drawSource.clear()   //先清除掉原来画的
                if(!this.draw) {
                    const draw = new Draw({
                        source: this.drawSource,
                        type: 'Circle',
                        geometryFunction: createBox()
                    })
                    this.draw = draw
                    let _this = this
                    this.draw.on('drawend', function(event) {
                        var feat = event.feature;
                        var geom = feat.getGeometry();
                        var coords = geom.getCoordinates();  //获取取经纬度坐标点
                        console.log(coords)
                        //var smoothened = makeSmooth(coords, parseInt(numIterations.value, 10) || 5);
                        //geometry.setCoordinates(smoothened);
                        if (geom.intersectsCoordinate([119.3978, 32.3955])) {  //判断某个坐标点是否处在所画的矩形区域之中
                            console.log('[119.3978, 32.3955]处在你画的区域之中')
                        }
                        let obj = {
                            "min_longitude": geom.extent_[0],
                            "min_latitude": geom.extent_[1],
                            "max_longitude": geom.extent_[2],
                            "max_latitude": geom.extent_[3]						
                        }
                        _this.map.removeInteraction(_this.draw)
                    })
                }                
                this.map.addInteraction(this.draw)                                
            },
            clearDraw() {  //清除画的图
                this.drawSource.clear()
            },
            closePopup() {  //关闭popup
                this.popup.setPosition(undefined)
                this.$refs.popupCloser.blur()
                return false
            },
            zoomout: function() {
                var view = this.map.getView()
                if (Number(view.getZoom()) < 19) {
                    view.animate({
                        zoom: view.getZoom() + 1
                    })
                }
            },
            zoomin: function() {
                var view = this.map.getView()
                if (Number(view.getZoom()) > 1) {
                    view.animate({
                        zoom: view.getZoom() - 1 
                    })
                }
            },
            /* 鼠标停放事件逻辑 */
            mouseoverevt: function(pixel) {
                var feature = this.map.forEachFeatureAtPixel(pixel, function(feature) {
                    return feature
                })
                var hit = this.map.hasFeatureAtPixel(pixel)                
                if (feature) {                    
                    this.map.getTarget().style.cursor = hit ? 'pointer': ''
                    // var coordinates = feature.getGeometry().getCoordinates()
                    // var layername = feature.get('layername')
                    // console.log(layername)
                    // switch (layername) {
                    //     case 'videolayer':                            
                    //         this.popup.setPosition(coordinates)
                    //         let name = feature.get('name')
                    //         this.popupObj = {
                    //             name,
                    //             content: name
                    //         }
                    //         break
                    // }
                } else {
                    //this.popup.setPosition(undefined)
                    this.map.getTarget().style.cursor = hit ? 'default' : ''
                }
            },
            addVideo() {
                MapApi.getvideojson({unitid:1},response=> {
                    var data = response.data.data
                    //console.log('data:', data)
                    if (data) {
                        for (var i = 0; i < data.length; i++) {
                            var code = data[i].code
                            var name = data[i].name
                            var lng = Number(data[i].lng)
                            var lat = Number(data[i].lat)
                            var point = new Point([lng, lat])
                            var feature = new Feature({
                                geometry: point,
                                code: code,
                                name: name,
                                layername: 'videolayer',
                                type: 'video'
                            })
                            feature.setId(code)
                            feature.setStyle(this.Iconstyle(feature))
                            this.vectorSource.addFeature(feature)
                        }
                    }
                },error=> {
                    console.log(error)
                })
            },
            getAreaData() {
                let postData = {
                    "command": "get",
                    "body": {
                        "data": {
                            "max_longitude": 118.071489,
                            "max_latitude": 36.916456,
                            "min_longitude": 117.151624,
                            "min_latitude": 36.460825
                        }
                    }
                }
                MapApi.getareadata(postData,response => {
                    console.log(response)
                }, error => {
                    console.log(error)
                })
            },
            openBlackAlarm() {  //弹出黑名单预警窗口
                this.blackAlarmWinStatus = true
            },
            openRealTimeCreate() { // 弹出实时新增窗口
                this.realTimeWinStatus = true
            },
            closeComDialog(winWhichStatus) {
                this[winWhichStatus] = false
            }
        },
        components: {
            StatisticData,
            realalarm,
            blackalarm
        }
    }
</script>

<style scoped lang="stylus">
.map-container { position: relative;}
.map-container, .map {
    height: 100%;
}
>>>.ol-attribution {
    display: none;
}
>>>.ol-zoom {
    display: none;
}
.maptype {
    width: 80px;
    height: 60px;
    position: absolute;
    right: 10px;
    bottom: 10px; 
    background: url(../assets/images/maptype.png) no-repeat;
    border: 1px solid rgba(153,153,153,.6);
    cursor: pointer;
    &:hover {
        border-color: #3385FF;
    }
    span {
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: 12px;
        color: #fff;
        padding: 0 3px;
        line-height: 20px;
        background: #3385FF;
    }
}
.maptools {
    position: absolute;
    left: 50px;
    top: 10px;
    z-index: 2;
    font-size: 14px;
    display: flex;
    align-items: center;
    padding: 3px 8px;
    background: rgba(255,255,255,0.5);
    border-radius: 2px;
    box-shadow: 1px 2px 1px rgba(0,0,0,.15);
    a {
        line-height: 26px;
        cursor: pointer;
        color: #4c4c4c;
        padding: 0 5px;
        margin-right: 1px;
        position: relative;
        user-select: none;
        &:hover {
            color: #3385FF;
        }
        &:last-child {
            margin-right: 0;
            &:after {
                border-right: none;
            }
        }
        &:after {
            content:'';
            position: absolute;
            height: 60%;
            top: 20%;
            right: -1px;
            border-right: 1px solid #ddd;
        }
        i { margin-right: 2px;}
    }
}
/*操作按钮*/
.operation-btns {
    position: absolute;
	top: 20px;
	right: 10px;
	z-index: 6;
	background: rgba(3,85,178,1);
	box-shadow: 0px 4px 5px rgba(12,63,116,0.4);
    font-size: 0;
    a {
        display: inline-block;
        height: 34px;
        line-height: 34px;
        font-size:16px;
        text-align: center;
        cursor: pointer;
        padding: 0 10px;
        color:white;
        margin-left: 1px;
        position: relative;
        &:hover {
            color: rgba(255,210,0,1);
        }
        &:before {
            content:'';
            display: block;
            position: absolute;
            height: 56%;
            border-left: 1px solid rgba(238,238,238,.16);
            left: -1px;
            top: 22%;
        }
        &:first-child {
            margin-left: 0;
            &:before {
                border: none;
            }
        }
    }
}

/*右下角的操作工具栏*/
.operation-tools {
    position: absolute;
    right: 10px;
    bottom: 100px;
    font-size: 14px;
}
.operation-tools a {
    display:block;
    width: 28px;
    height: 28px;
    line-height: 28px;
    color: #fff;
    border-radius: 2px;
    background-color: rgba(3,93,178,1);
    text-align: center;
    margin:0 auto 2px;
    cursor: pointer;
    &.rect-search {
        width: 40px;
        height: 40px;
        margin-bottom: 6px;
        background-image: url('../assets/images/rect-search.png');
        background-repeat: no-repeat;
        background-position: center center;
    }
    &.skywatch {
        background-image: url('../assets/images/skywatch-icon.png');
        background-repeat: no-repeat;
        background-position: center center;
    }
    &:hover {
        background-color: rgba(38,132,221,1);
    }
}
.operation-tools .zoom-box {
    width: 28px;
    background-color: rgba(3,93,178,1);
    border-radius: 2px;
    margin: 0 auto;
    a {
        border-radius: none;
        margin-bottom: none;
        background-repeat: no-repeat;
        background-position: center center;
        &.zoom-plus {
            background-image: url('../assets/images/zoom-plus.png')
            margin-bottom: 1px;
            position: relative;
            &:after {
                content:'';
                position: absolute;
                width: 60%;
                height: 0;
                left: 20%;
                bottom: -1px;
                border-bottom: 1px solid rgba(238,238,238,.16);
            }
        }
        &.zoom-reduce {
            background-image: url('../assets/images/zoom-reduce.png')
        }
    }
}

/* 当前光标的经纬度 */
.mouseposition-box {
    position: absolute;
    right: 100px;
    bottom: 10px;
    z-index: 2;
    >>>.mouseposition {        
        line-height: 26px;
        padding: 0 10px;
        background: rgba(255,255,255,0.5);
        font-size: 12px;
        color: #333;
        border-radius: 2px;
        box-shadow: 1px 1px 2px rgba(0,0,0,0.3)
    }
}
/*弹出层样式*/
.ol-popup {
    position: absolute;
    background-color: white;
    -webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
    filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
    padding: 15px;
    border-radius: 4px;
    border: 1px solid #cccccc;
    bottom: 12px;
    left: -40px;
    min-width: 280px;
}
.ol-popup:after, .ol-popup:before {
    top: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
}
.ol-popup:after {
    border-top-color: white;
    border-width: 10px;
    left: 48px;
    margin-left: -10px;
}
.ol-popup:before {
    border-top-color: #cccccc;
    border-width: 11px;
    left: 48px;
    margin-left: -11px;
}
.ol-popup-closer {
    text-decoration: none;
    position: absolute;
    top: 2px;
    right: 8px;
}
.ol-popup-closer:after {
    content: "✖";
}
</style>