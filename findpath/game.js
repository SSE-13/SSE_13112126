var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var game;
(function (game) {
    var GRID_PIXEL_WIDTH = 50;
    var GRID_PIXEL_HEIGHT = 50;
    var NUM_ROWS = 12;
    var NUM_COLS = 12;
    var WorldMap = (function (_super) {
        __extends(WorldMap, _super);
        function WorldMap() {
            _super.call(this);
            var grid = new astar.Grid(NUM_COLS, NUM_ROWS);
            this.grid = grid;
            grid.setWalkable(5, 0, false);
            grid.setWalkable(5, 1, false);
            grid.setWalkable(5, 2, false);
            grid.setWalkable(5, 3, false);
            grid.setWalkable(5, 4, false);
            grid.setWalkable(5, 5, false);
        }
        WorldMap.prototype.render = function (context) {
            context.strokeStyle = '#FF0000';
            context.beginPath();
            for (var i = 0; i < NUM_COLS; i++) {
                for (var j = 0; j < NUM_ROWS; j++) {
                    if (this.grid.getNode(i, j).walkable == true) {
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
        };
        return WorldMap;
    }(DisplayObject));
    game.WorldMap = WorldMap;
    var BoyShape = (function (_super) {
        __extends(BoyShape, _super);
        function BoyShape() {
            _super.apply(this, arguments);
        }
        BoyShape.prototype.render = function (context) {
            context.beginPath();
            context.fillStyle = '#00FFFF';
            context.arc(GRID_PIXEL_WIDTH / 2, GRID_PIXEL_HEIGHT / 2, Math.min(GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT) / 2 - 5, 0, Math.PI * 2);
            context.fill();
            context.closePath();
        };
        return BoyShape;
    }(DisplayObject));
    game.BoyShape = BoyShape;
    var BoyBody = (function (_super) {
        __extends(BoyBody, _super);
        function BoyBody() {
            _super.apply(this, arguments);
            this.point_x = new Array();
            this.point_y = new Array();
            //     point : Array<astar.Node>=[];
            //  lastTime;   
            //  Time ; 
            this.speed = 10;
            this.posi = 0;
        }
        BoyBody.prototype.run = function (grid) {
            grid.setStartNode(0, 0);
            grid.setEndNode(10, 8);
            var findpath = new astar.AStar();
            findpath.setHeurisitic(findpath.diagonal);
            var result = findpath.findPath(grid);
            var path = findpath._path;
            //    console.log(path);
            console.log(grid.toString());
            for (var i = 0; i < path.length; i++) {
                //  this.point[i]. = path[i].x;
                //   console.log(this.point[i].x);
                this.point_x[i] = path[i].x;
                this.point_y[i] = path[i].y;
            }
        };
        BoyBody.prototype.onTicker = function (duringTime) {
            if (this.posi < this.point_y.length) {
                this.dx = (this.point_x[this.posi + 1] - this.point_x[this.posi]);
                this.dy = (this.point_y[this.posi + 1] - this.point_y[this.posi]);
                this.t = Math.sqrt(this.dx * this.dx + this.dy * this.dy) / this.speed;
                this.vx = this.dx / this.t;
                this.vy = this.dy / this.t;
                if (this.x < this.point_x[this.posi + 1] * GRID_PIXEL_WIDTH && this.y < this.point_y[this.posi + 1] * GRID_PIXEL_HEIGHT) {
                    this.x += this.vx * duringTime;
                    this.y += this.vy * duringTime;
                }
                else {
                    this.posi++;
                }
            }
        };
        return BoyBody;
    }(Body));
    game.BoyBody = BoyBody;
})(game || (game = {}));
var boyShape = new game.BoyShape();
var world = new game.WorldMap();
var body = new game.BoyBody(boyShape);
body.run(world.grid);
var renderCore = new RenderCore();
renderCore.start([world, boyShape]);
var ticker = new Ticker();
ticker.start([body]);
