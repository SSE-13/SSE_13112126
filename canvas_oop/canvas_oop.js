var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 基类，负责处理x,y,rotation 等属性
 */
var DisplayObject = (function () {
    function DisplayObject() {
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
    }
    DisplayObject.prototype.draw = function (context) {
        context.save();
        context.rotate(this.rotation);
        context.translate(this.x, this.y);
        this.render(context);
        context.restore();
    };
    DisplayObject.prototype.render = function (context) {
    };
    return DisplayObject;
}());
var Bitmap = (function (_super) {
    __extends(Bitmap, _super);
    function Bitmap() {
        _super.apply(this, arguments);
    }
    Bitmap.prototype.render = function (context) {
        var image = imagePool[this.source];
        if (image) {
            context.drawImage(image, 0, 0);
        }
        else {
            context.font = "20px Arial";
            context.fillStyle = '#000000';
            context.fillText('错误的URL', 0, 20);
        }
    };
    return Bitmap;
}(DisplayObject));
var Rect = (function (_super) {
    __extends(Rect, _super);
    function Rect() {
        _super.apply(this, arguments);
        this.width = 100;
        this.height = 100;
        this.color = '#FF0000';
    }
    Rect.prototype.render = function (context) {
        context.fillStyle = this.color;
        context.fillRect(0, 0, this.width, this.height);
    };
    return Rect;
}(DisplayObject));
var TextField = (function (_super) {
    __extends(TextField, _super);
    function TextField() {
        _super.apply(this, arguments);
        this.color = '#EEB422';
        this.font = '80px Arial';
        this.string = 'VS';
    }
    TextField.prototype.render = function (context) {
        context.font = this.font;
        context.fillStyle = this.color;
        context.fillText(this.string, 0, 0);
    };
    return TextField;
}(DisplayObject));
function drawQueue(queue) {
    for (var i = 0; i < renderQueue.length; i++) {
        var displayObject = renderQueue[i];
        displayObject.draw(context);
    }
}
var imagePool = {};
function loadResource(imageList, callback) {
    var count = 0;
    imageList.forEach(function (imageUrl) {
        var image = new Image();
        image.src = imageUrl;
        image.onload = onLoadComplete;
        image.onerror = onLoadError;
        function onLoadComplete() {
            imagePool[imageUrl] = image;
            count++;
            if (count == imageList.length) {
                callback();
            }
        }
        function onLoadError() {
            alert('资源加载失败:' + imageUrl);
        }
    });
}
var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
/*
var rect = new Rect();
rect.width = 200;
rect.height = 100;
rect.color = '#00FF00'

var rect2 = new Rect();
rect2.width = 300;
rect2.height = 50;
rect2.x = 200;
rect2.y = 200;
rect2.rotation = Math.PI / 8;
rect2.color = '#00FFFF'

*/
/************
ctx.font="30px Verdana";
// 创建渐变
var gradient=ctx.createLinearGradient(0,0,canvas.width,0);
gradient.addColorStop(0,"magenta");
gradient.addColorStop(0.5,"blue");
gradient.addColorStop(1.0,"red");
// 用渐变填色
ctx.fillStyle=gradient;
ctx.fillText("w3school.com.cn",10,90);
********/
var text_one = new TextField();
text_one.x = 250;
text_one.y = 50;
text_one.font = "20px Georgia";
text_one.string = 'PRESS START';
text_one.color = '#EEE000';
// 创建渐变
var ctx = canvas.getContext("2d");
var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
gradient.addColorStop(0, "magenta");
gradient.addColorStop(0.5, "blue");
gradient.addColorStop(1.0, "red");
//text_one.color = gradient;
// 用渐变填色
var text_two = new TextField();
text_two.x = 160;
text_two.y = 300;
text_one.color = '#FF8C00';
var Background = new Bitmap();
Background.source = 'background.jpg';
var man_one = new Bitmap();
man_one.x = 0;
man_one.y = 50;
man_one.source = 'character_man_one.png';
var man_two = new Bitmap();
man_two.x = -5;
man_two.y = 130;
man_two.source = 'character_man_two.png';
var man_three = new Bitmap();
man_three.x = 100;
man_three.y = 130;
man_three.source = 'character_man_three.png';
var man_four = new Bitmap();
man_four.x = 230;
man_four.y = 110;
man_four.source = 'character_man_five.png';
var woman_one = new Bitmap();
woman_one.x = 320;
woman_one.y = 160;
woman_one.source = 'character_woman_one.png';
var woman_two = new Bitmap();
woman_two.x = 285;
woman_two.y = 190;
woman_two.source = 'character_woman_two.png';
//渲染队列
var renderQueue = [Background, man_one, man_three, man_two, man_four, woman_one, woman_two, text_one, text_two];
//资源加载列表
var imageList = ['background.jpg', 'character_man_one.png', 'character_man_three.png', 'character_man_two.png', 'character_man_five.png', 'character_woman_one.png', 'character_woman_two.png'];
//先加载资源，加载成功之后执行渲染队列
loadResource(imageList, function () {
    drawQueue(renderQueue);
});
