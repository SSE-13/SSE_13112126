"use strict";
const fs = require('fs');
function readFile() {
    var map_path = __dirname + "/map.json";
    var content = fs.readFileSync(map_path, "utf-8");
    var obj = JSON.parse(content);
    var mapData = obj.map;
    return mapData;
}
function writeFile() {
    var map_path = __dirname + "/map.json";
    var object = "{\"map\":" + JSON.stringify(mapData) + "}";
    //JSON.stringify(mapData); 
    fs.writeFileSync(map_path, object, "utf-8");
    return true;
}
function createMapEditor() {
    var world = new editor.WorldMap();
    var rows = mapData.length;
    var cols = mapData[0].length;
    for (var col = 0; col < rows; col++) {
        for (var row = 0; row < cols; row++) {
            var tile = new editor.Tile();
            tile.setWalkable(mapData[row][col]);
            tile.x = col * editor.GRID_PIXEL_WIDTH;
            tile.y = row * editor.GRID_PIXEL_HEIGHT;
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
function onTileClick(tile) {
    tile.setWalkable(!tile.getWalkable());
    // console.log(tile);
    var row = tile.x / 50;
    var col = tile.y / 50;
    if (mapData[row][col] == 0) {
        mapData[row][col] = 1;
    }
    else {
        mapData[row][col] = 0;
    }
    console.log(mapData[row][col]);
}
var mapData = readFile();
var Container = new render.DisplayObjectContainer();
var saveBackground = new render.Rect();
saveBackground.x = 0;
saveBackground.y = 220;
saveBackground.width = 100;
saveBackground.height = 50;
var save = new render.TextField();
save.x = 30;
save.y = 250;
function MouseHitTest(localPoint, displayObject) {
    if (localPoint.x > 0 && localPoint.x < displayObject.width && localPoint.y > 0 && localPoint.y < displayObject.height) {
        return true;
    }
    else {
        return false;
    }
}
function MouseOnclick(displayObject) {
    if (MouseHitTest) {
        writeFile();
        console.log("save success");
    }
}
/*var MouseHitTest=(localPoint: math.Point, displayObject: render.DisplayObject)=>Boolean{
     if(localPoint.x > 0 && localPoint.x < displayObject.width && localPoint.y>0 && localPoint.y< displayObject.height ){
        return true;
     } else {
        return false;
    }
}

*/
var renderCore = new render.RenderCore();
var eventCore = new events.EventCore();
eventCore.init();
var editor = createMapEditor();
renderCore.start(Container);
Container.addChild(saveBackground);
Container.addChild(save);
Container.addChild(editor);
eventCore.register(saveBackground, MouseHitTest, MouseOnclick);
