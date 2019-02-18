# openlayers在vue项目下的使用

## 初始化
1. `vue create vue-openlayers`
2. 移除vue 初始创建的一些不用的文件,如`assets`,`views`和`components`等目录下的文件
3. `src/views/MainMap.vue`和`assets/style.styl`样式准备, 当然`main.js`中要引入样式`import './assets/css/style.styl'`
```javascript
<template>
    <div class="map">
        我是地图主页
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped lang="stylus">
.map {
    height: 100%;
}
</style>
```
4. `yarn add -D stylus stylus-loader`（因为使用了stylus）

## 加入openlayers
+ [openlayers官方网址](https://openlayers.org/)
+ [openlayers的几个主要概念](https://openlayers.org/en/latest/doc/tutorials/concepts.html)
  1. Map(ol/Map) 是openlayers是主要组成,由一个页面元素承载
  2. View(ol/View) 视图,通常是指页面上的视图元素,如中心点,缩放级别,使用的坐标系等
    - openlayers默认使用的坐标系是(EPSG:3857),我们经常会需要自己指定坐标系（使用较普遍的是EPSG:4326）
  3. Source(ol/source/Source)
  4. Layers 图层 显示上面source的数据 主要有4个基本类型的图层
    - `ol/layer/Tile` 瓦片图层
    - `ol/layer/Image` 
    - `ol/layer/Vector` 
    - `ol/layer/VectorTile` 
    组合在一起
    ```javascript
    import Map from 'ol/Map';
    import View from 'ol/View';
    import OSM from 'ol/source/OSM';
    import TileLayer from 'ol/source/Tile';

    new Map({
    layers: [
        new TileLayer({source: new OSM()})
    ],
    view: new View({
        center: [0, 0],
        zoom: 2
    }),
    target: 'map'
    });
    ```
+ 安装`openlayers`包-`yarn add ol`
+ 修改`MainMap.vue`组件,构建出最基本的地图
```javascript
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
export default {
    data() {
        return {
            map: null
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
                view: new View({
                    center: [0,0],
                    zoom: 5
                })
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
.ol-attribution {
    display: none;
}
</style>
```
+ 隐藏掉右下角类似版权的
```css
>>>.ol-attribution {
    display: none;
}
```
+ 将 view也提取到data中
```javascript
data() {
    return {
        map: null,
        view: new View({
            projection: 'EPSG:4326',
            center: [118.786839, 37.414662],
            zoom: 12
        })
    }
},
```
+ 建立一个地图的配置文件`src/mapconfig.js`,方便以后在配置文件中修改
```javascript

var streetmaponline = 'http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer',   //在线街景
imagemaponline = 'http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',            //在线影像
streetmapoffline = 'http://192.168.4.183/yangzhoustreet/{z}/{x}/{-y}.png',                                   //离线街景
imagemapoffline = 'http://192.168.4.183/yangzhouimage/{z}/{x}/{-y}.png',                                     //离线影像
mapmode = 1,    //0表示离线，1表示在线
projection = 'EPSG:4326',   //地图坐标系
centerx = 116.399,
centery = 36.3945,
zoom = 8,
minzoom = 8,
maxzoom = 19,
linecolor = '#009cfe',  //轨迹线颜色
linewidth = 3;

const streetmapurl = mapmode === 1?  streetmaponline: streetmapoffline    //街景瓦片服务地址(根据是在线还是离线使用不同的地址)
const imagemapurl = mapmode ===1? imagemaponline: imagemapoffline         //影像瓦片服务地址

export {
  streetmapurl,
  imagemapurl,
  mapmode,
  projection,
  centerx,
  centery,
  zoom,
  minzoom,
  maxzoom,
  linecolor,
  linewidth
}

```
