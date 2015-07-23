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
    if (x != 0)
    {
        for (i = x + 7; i < x + width - 10; i++)
        {
            if (Math.random() < .5)
            {
                i = newObstacle(map, layer, i, y);
                i += 4;
            }
        }
    }
    return x + width;
}

function newObstacle(map, layer, x, y)
{
    var type = Math.random();
    var i, j;
    var width;
    var probability = .25;
    if (type < probability)
    {
        // row on ground to jump over
        width = 6;
        j = y - 1;
        for (i = x; i < x + width; i++)
        {
            map.putTile(1, i, j, layer);
        }
    }
    else if (type < probability * 2)
    {
        // block above ground to slide under
        width = Math.ceil(Math.random() * 4 + 3);
        for (i = x; i < x + width; i++)
        {
            for (j = y - 7; j < y - 1; j++)
            {
                if (j == y - 2 && (i == x || i == x + width - 1))
                {
                    // do nothing
                }
                else if (j == y - 2)
                {
                    map.putTile(4, i, j, layer);
                }
                else if (i == x)
                {
                    map.putTile(3, i, j, layer);
                }
                else if (i == x + width - 1)
                {
                    map.putTile(2, i, j, layer);
                }
                else
                {
                    map.putTile(0, i, j, layer);
                }
            }
        }
    }
    else if (type < probability * 3)
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
            map.putTile(4, i, j, layer);
        }
    }
    else
    {
        // small hill of spikes
        width = 5;
        map.putTile(3, x, y - 1, layer);
        map.putTile(2, x + width - 1, y - 1, layer);
        j = y - 2;
        for (i = x + 1; i < x + width - 1; i++)
        {
            map.putTile(1, i, j, layer);
            map.putTile(0, i, j + 1, layer);
        }
    }

    return x + width;
}

