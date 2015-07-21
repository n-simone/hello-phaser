function generateMap(map, layer)
{
    var x;
    var y = 15;
    for (x = 0; x < map.width; x++)
    {
        x = newBuilding(map, layer, x, y);
        x += 3;
        // y += Math.ceil(Math.random() * 10 - 5);
    }
}

function newBuilding(map, layer, x, y)
{
    for (x; x < 10 /*Math.random() * 10 + 10*/; x++)
    {
        map.putTile(0, x, y, layer);
    }
    return x;
}

function newObstacle(map, layer, x, y)
{

}
