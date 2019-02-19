<template>
    <div class="map-container">
        <div class="map" ref="map"></div>
        <div class="maptype" @click="changemap" ref="maptype">
            <span ref="maptypetext">街景</span>
        </div>
    </div>
</template>

<script>
    import 'ol/ol.css'
    import {Map,View} from 'ol'
    import TileLayer from 'ol/layer/Tile'
    import TileArcGISRest from 'ol/source/TileArcGISRest'
    import XYZ from 'ol/source/XYZ'
    import { projection, centerx, centery, zoom, streetmapurl, imagemapurl, mapmode } from '../mapconfig'
    export default {
        data() {
            return {
                map: null,
                view: new View({
                    projection,
                    center: [centerx, centery],
                    zoom
                }),
                streetmapLayer:null,        //街景图层
                imagemapLayer: null         //影像图层
            }
        },
        mounted() {
            this.initMap()
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
                const map = new Map({
                    target: this.$refs.map,
                    layers: [ this.streetmapLayer,this.imagemapLayer ],
                    view: this.view
                })
                this.map = map
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
</style>