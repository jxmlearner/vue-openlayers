<template>
    <div class="map-container">
        <div class="map" ref="map"></div>
    </div>
</template>

<script>
    import 'ol/ol.css'
    import {Map,View} from 'ol'
    import TitleLayer from 'ol/layer/Tile'
    import OSM from 'ol/source/OSM'
    import { projection, centerx, centery, zoom } from '../mapconfig'
    export default {
        data() {
            return {
                map: null,
                view: new View({
                    projection,
                    center: [centerx, centery],
                    zoom
                })
            }
        },
        mounted() {
            this.initMap()
        },
        methods: {
            initMap() {
                const map = new Map({
                    target: this.$refs.map,
                    layers: [
                        new TitleLayer({
                            source: new OSM()
                        })
                    ],
                    view: this.view
                })
                this.map = map
            }
        }
    }
</script>

<style scoped lang="stylus">
.map-container, .map {
    height: 100%;
}
>>>.ol-attribution {
    display: none;
}
</style>