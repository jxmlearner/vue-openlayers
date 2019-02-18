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
                basemap: null
            }
        },
        mounted() {
            this.initMap()
        },
        methods: {
            initMap() {  //初始化地图
                if (mapmode == 0) {  //如果是离线
                    this.basemap = new TileLayer({
                        source: new XYZ({
                            projection: 'EPSG:3857',
                            url: streetmapurl
                        })
                    })
                } else {
                    this.basemap = new TileLayer({
                        source: new TileArcGISRest({
                            url: streetmapurl
                        })
                    })
                }
                const map = new Map({
                    target: this.$refs.map,
                    layers: [ this.basemap ],
                    view: this.view
                })
                this.map = map
            },
            changemap() { //切换街景和影像地图
                var mapname = this.$refs.maptypetext.innerHTML                
                this.map.removeLayer(this.basemap)
                if (mapname == '街景') { 
                    if(mapmode === 0) {  //如果是离线
                        this.basemap = new TileLayer({
                            source: new XYZ({
                                tileSize: 256,
                                projection: 'EPSG:3857',
                                url: imagemapurl
                            })
                        }) 
                    } else {
                        this.basemap = new TileLayer({
                            source: new TileArcGISRest({
                                url: imagemapurl
                            })
                        })
                    }                        
                    this.$refs.maptypetext.innerHTML='影像'
                    this.$refs.maptype.style.backgroundPosition = "0 -60px";
                } else if (mapname == '影像') {
                    if(mapmode === 0) {  //如果是离线
                        this.basemap = new TileLayer({
                            source: new XYZ({
                                tileSize: 256,
                                projection: 'EPSG:3857',
                                url: streetmapurl
                            })
                        })
                    } else {
                        this.basemap = new TileLayer({
                            source: new TileArcGISRest({
                                url: streetmapurl
                            })
                        })
                    }                     
                    this.$refs.maptypetext.innerHTML='街景'
                    this.$refs.maptype.style.backgroundPosition = "0 0";
                }
                this.map.addLayer(this.basemap)
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