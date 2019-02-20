import axios from "./http"

//获取静态json文件数据
function getvideojson(data, cb, errorCb) {
    axios.get('mapdata/video.json', data).then(cb).catch(errorCb);
}

export default {
    getvideojson   
}