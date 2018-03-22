import originJSONP from 'common/js/jsonp';
import {commonParams, options} from './config';
import jsonp from '../common/js/jsonp';

export function getSingerList(){
    var url ='https://c.y.qq.com/v8/fcg-bin/v8.fcg';
    var data = Object.assign({},commonParams,{
        channel: 'singer',
        page: 'list',
        key: 'all_all_all',
        pagesize: 100,
        pagenum: 1,
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq'
    })
    return jsonp(url,data,options)
}