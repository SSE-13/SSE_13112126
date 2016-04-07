var canvas: HTMLCanvasElement = document.getElementById("game") as HTMLCanvasElement;
var context = canvas.getContext("2d");


module render {


    /**
     * 基类，负责处理x,y,rotation 等属性
     */
    export class DisplayObject {

        x = 0;
        y = 0;
        scaleX = 1;
        scaleY = 1;
        rotation = 0;

        /**
         * 全局矩阵
         */
        globalMatrix: render.Matrix;

        parent: DisplayObject;

        constructor() {
            this.globalMatrix = new render.Matrix();
           
        }
        
        change(m1:Matrix,m2:Matrix){
            var matrix = new render.Matrix();
            matrix.a = m1.a*m2.a +m1.b*m2.c;
            matrix.b = m1.a*m2.b + m1.b*m2.d;
            matrix.c = m1.c*m2.a + m1.d*m2.c;
            matrix.d = m1.c+m2.b + m1.d+m2.d;
            matrix.tx = m1.tx*m2.a + m1.ty*m2.c + m2.tx;
            matrix.ty = m1.tx*m2.b + m1.ty*m2.d + m2.ty;
            return matrix;
        }
        draw(context: CanvasRenderingContext2D) {

            var parent = this.parent;
            var angle = this.rotation / 180 * Math.PI;
            var skewX = angle;
            var skewY = angle;

            var localMatrix = new render.Matrix();
            localMatrix.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);

            if (!parent) {
                this.globalMatrix = localMatrix;
            }
            else {
            this.globalMatrix.a = localMatrix.a*parent.globalMatrix.a + localMatrix.b*parent.globalMatrix.c;
            this.globalMatrix.b = localMatrix.a*parent.globalMatrix.b + localMatrix.b*parent.globalMatrix.d;
            this.globalMatrix.c = localMatrix.c*parent.globalMatrix.a + localMatrix.d*parent.globalMatrix.c;
            this.globalMatrix.d = localMatrix.c*parent.globalMatrix.b + localMatrix.d*parent.globalMatrix.d;
            this.globalMatrix.tx = localMatrix.tx*parent.globalMatrix.a + localMatrix.ty*parent.globalMatrix.c + parent.globalMatrix.tx;
            this.globalMatrix.ty = localMatrix.tx*parent.globalMatrix.b + localMatrix.ty*parent.globalMatrix.d + parent.globalMatrix.ty;

                //TODO:
                // GLOBAL_MATRIX =  LOCAL_MATRIX*PARENT_GLOBAL_MATRIX; 
              // this.globalMatrix = localMatrix * this.parent.globalMatrix ;
              
            //  this.globalMatrix = this.change(localMatrix,parent.globalMatrix);
            }


            context.setTransform(
                this.globalMatrix.a,
                this.globalMatrix.b,
                this.globalMatrix.c,
                this.globalMatrix.d,
                this.globalMatrix.tx,
                this.globalMatrix.ty
            );
            this.render(context);
        }

        render(context: CanvasRenderingContext2D) {

        }
    }
    
  /*   function  change(m1:Matrix,m2:Matrix):Matrix{
            var matrix = new Matrix();
            matrix.a = m1.a*m2.a +m1.b*m2.c;
            matrix.b = m1.a*m2.b + m1.b*m2.d;
            matrix.c = m1.c*m2.a + m1.d*m2.c;
            matrix.d = m1.c+m2.b + m1.d+m2.d;
            matrix.tx = m1.tx*m2.a + m1.ty*m2.c + m2.tx;
            matrix.ty = m1.tx*m2.b + m1.ty*m2.d + m2.ty;
            return matrix;
        }
*/
    export class DisplayObjectContainer extends DisplayObject {


        children: Array<DisplayObject>

        constructor() {
            super();
            this.children = [];
        }

        addChild(child: DisplayObject) {
            this.children.push(child);
            child.parent = this;
        }

        render(context) {
            for (var i = 0; i < this.children.length; i++) {
                var child = this.children[i];
                child.draw(context);
            }
        }
    }

    export class Bitmap extends DisplayObject {


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

        render(context: CanvasRenderingContext2D) {
            context.font = "20px Arial";
            context.fillStyle = '#000000';
            context.fillText('HelloWorld', 0, 20);
        }
    }



    var imagePool = {};

    function loadResource(imageList, callback) {
        var count = 0;
        if (imageList.length == 0) {
            callback();
            return;
        }
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

            function onLoadError() {
                alert('资源加载失败:' + imageUrl);
            }
        })
    }



    /**
     * 渲染核心
     */
    export class RenderCore {

        stage;
        /**
         * 启动渲染核心
         * @param renderQueue 渲染队列
         * @param imageList 资源列表
         */
        start(stage: DisplayObject, resourceList = []) {
            stage.parent = null;
            this.stage = stage;
            var self = this;
            loadResource(resourceList, function() {
                requestAnimationFrame(self.onEnterFrame.bind(self));
            })

        }

        onEnterFrame() {
            context.save();
            context.clearRect(0, 0, canvas.width, canvas.height);
            this.drawQueue(this.stage);
            context.restore();
            requestAnimationFrame(this.onEnterFrame.bind(this));
        }

        drawQueue(stage: DisplayObject) {
            stage.draw(context);
        }

    }
}