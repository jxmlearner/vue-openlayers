<template>
    <div class="map-container">
        <div class="map" ref="map"></div>
        <div class="maptools">
            <a @click="drawRectangle"><i class="iconfont icon-rectangle"></i>画矩形</a>
            <a @click="clearDraw"><i class="iconfont icon-custom-clear"></i>清除</a>
        </div>
        <div class="maptype" @click="changemap" ref="maptype"> <!-- 右下角街景和影像地图切换 -->
            <span ref="maptypetext">街景</span>
        </div>
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
                selectInteraction: new Select()
            }
        },
        mounted() {
            this.initMap()
            this.addVideo()
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
                        var geometry = feat.getGeometry();
                        var coords = geometry.getCoordinates();  //获取取经纬度坐标点
                        console.log(coords)
                        //var smoothened = makeSmooth(coords, parseInt(numIterations.value, 10) || 5);
                        //geometry.setCoordinates(smoothened);
                        if (geometry.intersectsCoordinate([119.3978, 32.3955])) {  //判断某个坐标点是否处在所画的矩形区域之中
                            console.log('[119.3978, 32.3955]处在你画的区域之中')
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
                    console.log('data:', data)
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
            }
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