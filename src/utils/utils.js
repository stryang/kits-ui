/**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
    let random = ''
    random = Math.ceil(Math.random() * 100000000000000).toString().substr(0, typeof len === 'number' ? len : 4)
    if (date) random = random + Date.now()
    return random
}

/**
 * 加密处理
 */
export const encryption = (params) => {
    let {
        data,
        type,
        param,
        key
    } = params
    let result = JSON.parse(JSON.stringify(data))
    if (type === 'Base64') {
        param.forEach(ele => {
            result[ele] = btoa(result[ele])
        })
    } else {
        param.forEach(ele => {
            var data = result[ele]
            key  = CryptoJS.enc.Latin1.parse(key)
            var iv = key
            //加密
            var encrypted = CryptoJS.AES.encrypt(
                data,
                key,
                { iv:iv,
                    mode:CryptoJS.mode.CBC,
                    padding:CryptoJS.pad.ZeroPadding
                })
            result[ele] = encrypted.toString()
        })
    }
    return result
}

/**
 * 判断是否为空
 */
export function validatenull(val) {
    if (val instanceof Array) {
        if (val.length == 0) return true;
    } else if (val instanceof Object) {
        if (JSON.stringify(val) === '{}') return true;
    } else {
        if (val == 'null' || val == null || val == 'undefined' || val == undefined || val == '') return true;
        return false;
    }
    return false;

}

/**
 * 字节格式化函数 有bug
 */
export function bytesToSize(bytes) {
    if (bytes === 0) return '0 B';
    let k = 1024;
    let sizes = ['B','KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let i = Math.floor(Math.log(bytes) / Math.log(k))
    return (bytes / Math.pow(k, i)).toPrecision(3) + '' + sizes[i];
}

/**
 * 字节格式化函数
 */
export function bytesFormat(size) {
    let number = Number(size)
    let name = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
    let pos = 0;
    while(number >= 1024)
    {
        number /= 1024;
        pos ++;
    }
    return number.toFixed(2) + name[pos];
}

/**
 * 组名称简写
 */
export function smpleName(name) {
    if(name == '' || name == null || name.length < 7) {
        return name
    }
    return name.substr(0, 6) + '...'
}

/**
 * 组名称简写
 */
export function smpleName_qsfx(name, length) {
    if(name == '' || name == null || name.length <= length) {
        return name
    }
    return name.substr(0, length) + '\n' + smpleName_qsfx(name.substr(length, name.length - 1), length)
}
