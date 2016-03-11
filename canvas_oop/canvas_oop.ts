/**
 * 基类，负责处理x,y,rotation 等属性
 */ 
class DisplayObject {

    x = 0;

    y = 0;

    rotation = 0;

    draw(context: CanvasRenderingContext2D) {
        context.save();
        context.rotate(this.rotation);
        context.translate(this.x, this.y);
        this.render(context);

        context.restore();
    }

    render(context: CanvasRenderingContext2D) {

    }

}

class Bitmap extends DisplayObject {

    source;

    render(context: CanvasRenderingContext2D) {

        var image = imagePool[this.source];
        if (image) {
            context.drawImage(image, 0, 0);
        }
        else {
            context.font = "20px Arial";
            context.fillStyle = '#000000';
            context.fillText('错误的URL', 0, 20);
        }
    }

}

class Rect extends DisplayObject {

    width = 100

    height = 100;

    color = '#FF0000';

    render(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        context.fillRect(0, 0, this.width, this.height);
    }
}

class TextField extends DisplayObject {
    color = '#EEB422';
    font = '80px Arial';
    string  = 'VS';
    render(context: CanvasRenderingContext2D) {
        context.font = this.font
        context.fillStyle =this.color;
        context.fillText(this.string, 0,0);
    }
}

function drawQueue(queue) {
    for (var i = 0; i < renderQueue.length; i++) {
        var displayObject: DisplayObject = renderQueue[i];
        displayObject.draw(context);
    }
}

var imagePool = {};

function loadResource(imageList, callback) {
    var count = 0;
    imageList.forEach(function(imageUrl) {
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
        
        function onLoadError(){
            alert('资源加载失败:' + imageUrl);
        }
    })
}


var canvas: HTMLCanvasElement = document.getElementById("game") as HTMLCanvasElement;
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
var canvas = document.getElementById("game");
var ctx=canvas.getContext("2d");

ctx.font="20px Georgia";
ctx.fillText("Hello World!",10,50);

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
text_one.x = 150;
text_one.y =250;

var Background = new Bitmap();
Background.source = 'background.jpg';

var man_one = new Bitmap();
man_one.x = 0;
man_one.y = 50;
man_one.source = 'character_man_one.png';

var man_two = new Bitmap();
man_two.x =-5;
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
woman_two.x =285;
woman_two.y = 190;
woman_two.source = 'character_woman_two.png';


//渲染队列
var renderQueue = [Background,man_one,man_three,man_two,man_four,woman_one,woman_two,text_one];
//资源加载列表
var imageList = ['background.jpg','character_man_one.png','character_man_three.png','character_man_two.png','character_man_five.png','character_woman_one.png','character_woman_two.png'];

//先加载资源，加载成功之后执行渲染队列
loadResource(imageList, function() {
    drawQueue(renderQueue);
})


