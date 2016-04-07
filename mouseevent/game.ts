var humanContainer = new render.DisplayObjectContainer();
humanContainer.x=100;
humanContainer.y=200;

var head = new render.Bitmap();
head.source = "head.png";
head.x=-20;
head.y=-55;
head.width=44;
head.hight=44;
humanContainer.addChild(head)

var trunk = new render.Bitmap();
trunk.source = "trunk.png";
trunk.x=-5;
trunk.y=-20;
trunk.width=13;
trunk.hight=68;
humanContainer.addChild(trunk)

var R_arm = new render.Bitmap();
R_arm.source = "R_arm.png";
R_arm.x=-30;
R_arm.y=-20;
R_arm.width=34;
R_arm.hight=42;
humanContainer.addChild(R_arm)

var L_arm = new render.Bitmap();
L_arm.source = "L_arm.png";
L_arm.x=0;
L_arm.y=-20;
L_arm.width=38;
L_arm.hight=39;
humanContainer.addChild(L_arm)

var R_leg = new render.Bitmap();
R_leg.source = "R_leg.png";
R_leg.x=-35;
R_leg.y=35;
R_leg.width=41;
R_leg.hight=35;
humanContainer.addChild(R_leg)

var L_leg = new render.Bitmap();
L_leg.source = "L_leg.png";
L_leg.x=0;
L_leg.y=35;
L_leg.width=38;
L_leg.hight=44;
humanContainer.addChild(L_leg);

var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["head.png","trunk.png","R_arm.png","L_arm.png","R_leg.png","L_leg.png"]);


class HumanBody extends Body {
   
    vx:number = 5;
    rot:number=2;
   
    onTicker(duringTime: number) {
        this.x += this.vx*duringTime;//+= duringTime * this.vx;
        this.rotation += this.rot*Math.PI*duringTime;

    }
}

var ticker = new Ticker();
var body = new HumanBody(humanContainer);
ticker.start([body]);


var eventCore = new events.EventCore();
eventCore.init();

var stop:boolean = false;

var headHitTest = (localPoint:math.Point,displayObject:render.DisplayObject) =>{
    if(localPoint.x>0 && localPoint.x< head.width && localPoint.y>0  && localPoint.y<head.hight){
        return true;
    }else{
        return false;
    }
}

var headOnClick = () => {
  if(!stop){
      body.vx =-5;
      body.rot = -2;
  }else{
      body.vx = 5;
      body.rot = 2;
      stop = false;
  }
}
var RLegHitTest = (localPoint:math.Point,displayObject:render.DisplayObject) =>{
    if(localPoint.x>0 && localPoint.x<R_leg.width && localPoint.y>0 && localPoint.y<R_leg.hight ){
        return true;
    }else{
        return false;
    }
}

var RLegOnClick = () => {
    if(RLegHitTest){
        stop=true;
        body.vx=0;
        body.rot = 0;
    }
}

var LLegHitTest = (localPoint:math.Point,displayObject:render.DisplayObject) =>{
    if(localPoint.x>0 && localPoint.x<L_leg.width && localPoint.y>0 && localPoint.y<L_leg.hight ){
        return true;
    }else{
        return false;
    }
}

var LLegOnClick = () => {
    if(LLegHitTest){
        stop=true;
        body.vx=0;
        body.rot = 0;
    }
}
eventCore.register(head,headHitTest,headOnClick);
eventCore.register(R_leg,RLegHitTest,RLegOnClick);
eventCore.register(L_leg,LLegHitTest,LLegOnClick);










