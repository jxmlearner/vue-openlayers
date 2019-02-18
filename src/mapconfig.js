
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
