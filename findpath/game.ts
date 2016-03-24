module game {


    const GRID_PIXEL_WIDTH = 50;

    const GRID_PIXEL_HEIGHT = 50;

    const NUM_ROWS = 12;

    const NUM_COLS = 12;

    export class WorldMap extends DisplayObject {


        public grid: astar.Grid;
        constructor() {
            super();
            var grid = new astar.Grid(NUM_COLS, NUM_ROWS);
            this.grid = grid;
            grid.setWalkable(5, 0, false);
            grid.setWalkable(5, 1, false);
            grid.setWalkable(5, 2, false);
            grid.setWalkable(5, 3, false);
            grid.setWalkable(5, 4, false);
            grid.setWalkable(5, 5, false);

        }

        render(context: CanvasRenderingContext2D) {
            context.strokeStyle = '#FF0000';
            context.beginPath();
            for (var i = 0; i < NUM_COLS; i++) {
                for (var j = 0; j < NUM_ROWS; j++) {
                    if ( this.grid.getNode(i,j).walkable == true) {
                    context.fillStyle = '#0000FF';
                    } 
                    else {
                    context.fillStyle = '#000000';
                    }
                    context.fillRect(i * GRID_PIXEL_WIDTH, j * GRID_PIXEL_HEIGHT, GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT);
                    context.strokeRect(i * GRID_PIXEL_WIDTH, j * GRID_PIXEL_HEIGHT, GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT);
                }
            }
            context.closePath();
        }

    }

    export class BoyShape extends DisplayObject {
        
        render(context: CanvasRenderingContext2D) {
            context.beginPath()
            context.fillStyle = '#00FFFF';
            context.arc(GRID_PIXEL_WIDTH / 2, GRID_PIXEL_HEIGHT / 2, Math.min(GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT) / 2 - 5, 0, Math.PI * 2);
            context.fill();
            context.closePath();
        }
    }
    
    

    export class BoyBody extends Body {
        
         point_x = new Array();
         point_y = new Array();
  //     point : Array<astar.Node>=[];
 
       //  lastTime;   
       //  Time ; 
         speed = 10;  
         t;
         dx;
         dy;
         posi = 0;
         
        public run(grid) {
            grid.setStartNode(0, 0);
            grid.setEndNode(10, 8);
            var findpath = new astar.AStar();
            findpath.setHeurisitic(findpath.diagonal);
            var result = findpath.findPath(grid);
            var path = findpath._path;
      //    console.log(path);
            console.log(grid.toString());
            for(var i: number = 0; i < path.length; i++){
        //  this.point[i]. = path[i].x;
       //   console.log(this.point[i].x);
            this.point_x[i] = path[i].x;
            this.point_y[i] = path[i].y;
        }
     }

        public onTicker(duringTime) {
   
          if(this.posi <= this.point_y.length){
                this.dx = (this.point_x[this.posi+1]-this.point_x[this.posi]);
                this.dy = (this.point_y[this.posi+1]-this.point_y[this.posi]);
                this.t = Math.sqrt(this.dx*this.dx + this.dy*this.dy)/this.speed;
                this.vx = this.dx/this.t;
                this.vy = this.dy/this.t;
                console.log(this.vx,this.vy);
             
                if(this.x <= this.point_x[this.posi+1] *GRID_PIXEL_WIDTH || this.y <= this.point_y[this.posi+1]*GRID_PIXEL_HEIGHT ){  
                    this.x += this.vx * duringTime ;
                    this.y += this.vy * duringTime;
                 }else{
                    this.posi++;
                 }
            }
        }
    }
}


var boyShape = new game.BoyShape();
var world = new game.WorldMap();
var body = new game.BoyBody(boyShape);
body.run(world.grid);

var renderCore = new RenderCore();
renderCore.start([world, boyShape]);

var ticker = new Ticker();
ticker.start([body]);

