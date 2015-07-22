function generateMap(map, layer)
{
    var x;
    var y = 15;
    for (x = 0; x < map.width; x += 7)
    {
        x = newBuilding(map, layer, x, y);
        y += Math.ceil(Math.random() * 8 - 4);
    }
}

function newBuilding(map, layer, x, y)
{
    var width = Math.ceil(Math.random() * 20 + 20);
    var i, j;
    for (i = x; i < x + width; i++)
    {
        for (j = y; j < map.height; j++)
        {
            map.putTile(0, i, j, layer);
        }
    }
    for (i = x + 7; i < x + width - 10; i++)
    {
        if (Math.random() < 1)
        {
            i = newObstacle(map, layer, i, y);
            i += 4;
        }
    }
    return x + width;
}

function newObstacle(map, layer, x, y)
{
    var type = Math.random();
    var i, j;
    var width;
    if (type < .33)
    {
        // row on ground to jump over
        width = 6;
        j = y - 1;
        for (i = x; i < x + width; i++)
        {
            map.putTile(1, i, j, layer);
        }
    }
    else if (type < .66)
    {
        // block above ground to slide under
        width = Math.ceil(Math.random() * 4 + 3);
        for (i = x; i < x + width; i++)
        {
            for (j = y - 7; j < y - 1; j++)
            {
                map.putTile(1, i, j, layer);
            }
        }
    }
    else
    {
        // row above ground to jump over or slide under
        width = Math.ceil(Math.random() * 4 + 4);
        j = y - 3;
        for (i = x; i < x + width; i++)
        {
            map.putTile(0, i, j, layer);
        }
        j ++;
        for (i = x; i < x + width; i++)
        {
            map.putTile(1, i, j, layer);
        }
    }
    return x + width;
}

