import originJSONP from 'jsonp';

export default function jsonp (url,data,option){
    url += (url.indexOf('?')<0?'?':'&')+params(data)
    originJSONP(url,option,(err,data) => {
        return new Promise((resolve,reject) => {
            if(!err){
                resolve(data)
            }else{
                reject(err)
            }
        })
    })
}

function params(data){
    let url = '';
    for(var k in data){
        let value = data[k]!==undefined?data[k]:'';
        url += `&${k}=${encodeURIComponent(value)}`
    }
    return url?url.substring(1):''
}