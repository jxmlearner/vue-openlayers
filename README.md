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



