module game {


}

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
         vx=2;

    onTicker(duringTime: number) {
     
         this.x +=this.vx*duringTime; 
      //   this.y =50;
         this.rotation += Math.PI*duringTime;
    }
}

var ticker = new Ticker();
var body = new HumanBody(humanContainer);
ticker.start([body]);











