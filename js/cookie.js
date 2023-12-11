// 封装一个设置cookie的方法
function setCookie(key, value, n) {
    var date = new Date();
    date.setDate(date.getDate() + n);
    value = encodeURI(value);
    document.cookie = key + "=" + value + "; expires=" + date + ";";
}
//封装一个获取cookie的方法
function getCookie(key) {
    var cookie = document.cookie;
    var arr = cookie.split("; ");
    for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split("=");
        if (key == arr2[0]) {
            return decodeURI(arr2[1]);
        }
    }
    return "";
}
//封装一个删除cookie的方法
function removeCookie(key) {
    var date = new Date();
    date.setDate(date.getDate() - 1);
    document.cookie = key + "=0; expires=" + date;
}