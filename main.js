/**
 * Created by czf on 2018/1/16.
 */


// fancybox插件
$(document).ready(function () {
    // 对weibo-img类加载jQuery插件fancybox
    $(".weibo-img").fancybox({
        prevEffect: 'elastic', // 向左切换照片
        nextEffect: 'elastic', // 向右切换照片
        // 缩略图
        helpers: {
            // 缩略图标题
            title: {
                type: 'inside'
            },
            // 缩略图大小
            thumbs: {
                width: 50,
                height: 50
            }
        }
    });
});

// 网页载入时加载的js函数
window.onload = function () {
    change_adv();                       // 切换图片的数字标题
    show_date();                        // 显示日期
    setInterval(show_time, 1000);       // 每1000ms刷新一次时间
    change_adv_auto();                  // 自动轮播图片
};


// 根据图片是横版的还是竖版的来设定基准边，否则不能统一剪裁到一个正方形里，前提图片大于size * size
function set_img_size(image, size){
    if (image.width > image.height) {   // 如果图片是横着的
        image.height = size;            // 剪裁它的高，使得图片能铺满
    } else {                            // 如果图片是竖着的
        image.width = size;             // 剪裁它的宽，使得图片能铺满
    }
}

// 用数字导航改变图片
function change_adv() {
    // 监听三个按钮
    for (var i = 1; i <= 3; i ++) {
        var id = "a" + i; // 监听的id
        const img_url = "images/adv" + i + ".jpg"; // 对应的图片链接
        // 如果监听到了
        if (document.getElementById(id) !== null) {
            // 鼠标移动到了序号按钮上
            document.getElementById(id).onmouseover = function () {
                document.getElementById("adv-img").src = img_url; // 更换图片
            }
        }
    }
}

// 自动轮播图片
function change_adv_auto() {
    var index = 1;              // 当前的图片下标
    var time_interval = 2000;   // 自动切换的时间间隔，2000毫秒
    // 在设置间隔的setInterval中写匿名函数
    // setInterval(函数名, 时间间隔)
    setInterval(function () {
        document.getElementById("adv-img").src = "images/adv" + index + ".jpg"; // 更换图片
        index = index + 1;                                                      // 下一张图片
        if (index === 4) {                                                      // 如果到头了，变第一张
            index = 1;
        }
    }, time_interval)
}

// 显示日期
function show_date() {
    var data = new Date();          // 获得时间
    var week_day = data.getDay();   // 获得星期几，从0 ~ 6，正好能对应下面字符串数组中的星期几
    var week_day_str = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"); // 星期字符串
    // 把日期写到HTML里
    document.getElementById("display-date").innerHTML = "<span>" + data.getFullYear() + "年" + (data.getMonth()+1) + "月" + data.getDate() + "日 " + week_day_str[week_day] + "</span>";
}


// 显示时间
function show_time() {
    var date = new Date();  // 获得时间
    // 利用toLocaleTimeString转化为时间字符串
    document.getElementById("display-time").innerHTML = "<span>" + date.toLocaleTimeString() + "</span>" ;
}

// 在网页中插入一条新微博
function send_weibo() {
    // 获取text-area文本输入框中的文本
    var content = document.getElementById('text-area').value;
    // 创建一个时间
    var date = new Date();
    // 要写入的微博HTML
    var weibo =
        '<div class="weibo">' +
            '<div class="weibo-avatar"><img src="images/avatar.jpg"></div>' +
            '<div class="weibo-detail">' +
            '<div class="weibo-info">CivinX</div>' +
            '<div class="weibo-time">' + '<span>' + date.toLocaleDateString() + ' ' + date.toLocaleTimeString() + '</span>' + '</div>' +
            '<div class="weibo-text">' + content + '</div>' +
        '</div>' +
        '<div class="weibo-button-area">' +
        '<ul>' +
        '<li><a href="#">收藏</a></li>' +
        '<li><a href="#">转发</a></li>' +
        '<li><a href="#">评论</a></li>' +
        '<li><a href="#">点赞</a></li>' +
        '</ul>' +
        '</div>' +
        '</div>' ;
    $('.weibo-container').prepend(weibo);   // 向class weibo-container的最前面加入上述的HTML
}
