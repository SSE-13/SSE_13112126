module game {


}

var humanContainer = new render.DisplayObjectContainer();
var head = new render.Bitmap();
head.source = "head.png";
humanContainer.addChild(head)

var trunk = new render.Bitmap();
trunk.source = "trunk.png";
humanContainer.addChild(trunk)

var R_arm = new render.Bitmap();
R_arm.source = "R_arm.png";
humanContainer.addChild(R_arm)

var L_arm = new render.Bitmap();
L_arm.source = "L_arm.png";
humanContainer.addChild(L_arm)

var R_leg = new render.Bitmap();
R_leg.source = "R_leg.png";
humanContainer.addChild(R_leg)

var L_leg = new render.Bitmap();
L_leg.source = "L_leg.png";
humanContainer.addChild(L_leg)



var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["head.png","trunk.png","R_arm.png","L_arm.png","R_leg.png","L_leg.png"]);


class HumanBody extends Body {


    onTicker(duringTime: number) {
         this.vx=2;
         this.x +=this.vx*duringTime; 
         this.y +=this.vy*duringTime; 
         this.rotation += 1;
         console.log(this.x);
    }
}

var ticker = new Ticker();
var body = new HumanBody(humanContainer);
ticker.start([body]);











