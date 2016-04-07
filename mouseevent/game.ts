var humanContainer = new render.DisplayObjectContainer();
var head = new render.Bitmap();
head.source = "head.png";
head.x=50;
head.y=100;
humanContainer.addChild(head)

var trunk = new render.Bitmap();
trunk.source = "trunk.png";
trunk.x=65;
trunk.y=135;
humanContainer.addChild(trunk)

var R_arm = new render.Bitmap();
R_arm.source = "R_arm.png";
R_arm.x=40;
R_arm.y=135;
humanContainer.addChild(R_arm)

var L_arm = new render.Bitmap();
L_arm.source = "L_arm.png";
L_arm.x=70;
L_arm.y=135;
humanContainer.addChild(L_arm)

var R_leg = new render.Bitmap();
R_leg.source = "R_leg.png";
R_leg.x=35;
R_leg.y=190;
humanContainer.addChild(R_leg)

var L_leg = new render.Bitmap();
L_leg.source = "L_leg.png";
L_leg.x=65;
L_leg.y=190;
humanContainer.addChild(L_leg)

var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["head.png","trunk.png","R_arm.png","L_arm.png","R_leg.png","L_leg.png"]);



class HumanBody extends Body {
   
    vx:number = 5;
   
    onTicker(duringTime: number) {
        this.x += this.vx*duringTime;//+= duringTime * this.vx;
        this.rotation += 2*Math.PI*duringTime;

    }
}

var ticker = new Ticker();
var body = new HumanBody(humanContainer);
ticker.start([body]);


var eventCore = new events.EventCore();
eventCore.init();

var headHitTest = (localPoint:math.Point,displayObject:render.DisplayObject) =>{
    alert (`点击位置为${localPoint.x},${localPoint.y}`);
    return true;
}

var headOnClick = () => {
    alert("clicked!!");
  //  body.vx=-5;
    //修改 HumanBody 的速度，使其反向移动
}
var LegHitTest = (localPoint:math.Point,displayObject:render.DisplayObject) =>{
    alert (`点击位置为${localPoint.x},${localPoint.y}`);
    return true;
}

var LegOnClick = () => {
    alert("clicked!!");
  //  body.vx=-5;
    //修改 HumanBody 的速度，使其反向移动
}

eventCore.register(head,headHitTest,headOnClick);










