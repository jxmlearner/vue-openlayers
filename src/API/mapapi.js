import axios from "./http"

//获取静态json文件数据
function getvideojson(data, cb, errorCb) {
    axios.get('mapdata/video.json', data).then(cb).catch(errorCb)
}

//获取划定区域数据
function getareadata(data,cb,errorCb) {
    axios.post('http://192.168.0.224:13800/cloud/web/area/areas',data).then(cb).catch(errorCb)
}

export default {
    getvideojson,
    getareadata  
}