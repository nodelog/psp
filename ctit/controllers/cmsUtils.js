//exports.trim = function (str) {
//    return str.replace(/(^\s*)|(\s*$)/g, "");
//}
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

exports.page= function (page, total) {
    var totalPage = Math.ceil(total / 10);
    page = ((page < 1) ? 1 : ((page == undefined) ? 1 : page));
    page = ((page > totalPage) ? totalPage : page);
    return {"page":page, "totalPage": totalPage};
}