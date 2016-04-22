

function createMapEditor() {
    
    var world = new editor.WorldMap();
    var rows = mapData.length;
    var cols = mapData[0].length;

    for (var col = 0; col < rows; col++) {
        for (var row = 0; row < cols; row++) {
            var tile = new editor.Tile();
            tile.setWalkable(mapData[row][col]);
            tile.x = col * editor.GRID_PIXEL_WIDTH;
            tile.y = row * editor.GRID_PIXEL_HEIGHT
            tile.ownedCol = col;
            tile.ownedRow = row;
            tile.width = editor.GRID_PIXEL_WIDTH;
            tile.height = editor.GRID_PIXEL_HEIGHT;
            world.addChild(tile);

            eventCore.register(tile, events.displayObjectRectHitTest, onTileClick);
        }
    }
    return world;

}

function createUIEditor() {
    
    var world = new editor.WorldMap();
    var rows = 3;
    var cols = mapData.length;

    for (var col = 0; col < rows; col++) {
        for (var row = 0; row < cols; row++) {
            var tile = new editor.Tile();
            tile.setUIBackgroundColor();
            tile.SetStrokeValue(false);
            tile.x = col * editor.GRID_PIXEL_WIDTH;
            tile.y = row * editor.GRID_PIXEL_HEIGHT
            tile.ownedCol = col;
            tile.ownedRow = row;
            tile.width = editor.GRID_PIXEL_WIDTH;
            tile.height = editor.GRID_PIXEL_HEIGHT;
            world.addChild(tile);
        }
    }
    return world;
}



function onTileClick(tile: editor.Tile) {
    console.log(tile);
}




var storage = data.Storage.getInstance();
storage.readFile();
var mapData = storage.mapData;
var renderCore = new render.RenderCore();
var eventCore = events.EventCore.getInstance();
eventCore.init();


var mapEditor = createMapEditor();
var grid=new astar.Grid(mapData.length,mapData[0].length);
var UIEditor=createUIEditor();
mapEditor.x=150;
var RowValue=new render.TextField();
var ColValue=new render.TextField();
var stage = new render.DisplayObjectContainer();
stage.addChild(mapEditor);
stage.addChild(UIEditor);
stage.addChild(RowValue);
stage.addChild(ColValue);


var panel = new editor.ControlPanel();
panel.x = 300;
stage.addChild(panel);

renderCore.start(stage);
