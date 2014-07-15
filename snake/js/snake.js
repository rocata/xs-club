
var Snake = function (gameSpace) {
    if (!gameSpace) {
        console.error("Cannot initialize Snake without a control parent");
        return null;
    }
    var snakeUtil = new SnakeUtil(gameSpace);

    var snake = {
        "moveSpeed": 10,        //  Pixels
        "gameSpeed": 20,        //  Milliseconds
        "gameSpace": gameSpace,
        "resume": function () {
            if (state !== "running" || true) {
                if (!timer) {
                    timer = setInterval(ticTac, this.gameSpeed);
                    state = "running";
                }
                else {
                    console.error("Invalid state ~ timer coordination while running ( timer active ) !")
                }
            }
        },
        "pause": function () {
            if (state === "running") {
                clearInterval(timer);
                timer = null;
                state = "paused";
            }
        },
        "toggleState": function () {
            switch (state) {
                case "running":
                    this.pause();
                    break;
                case "paused":
                    this.resume();
                    break;
            }
        },
        "changeDirection": function (dir) {
            direction = dir;
        }
    };
    $(gameSpace).css("background-color", "#123123");
    $(gameSpace).css("padding-left")
    snake.itemSize = parseInt(snake.moveSpeed - (15 / 100 * snake.moveSpeed), 10);

    var timer = null;
    var state = null;
    var direction = null;
    var snakeHead = null;
    var q = [];

    var food = null;

    var checkCollision = function (rect1, rect2) {
        if (rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.top > rect2.bottom ||
            rect1.bottom < rect2.top)
            return false;
        return true;
    };
    var verifyWallCollision = function (newPoint) {

        var gameSpacePosition = $(gameSpace).position();

        if (newPoint.x < 0) {
            return null;
        }
        if (newPoint.x >= gameSpacePosition.left + $(gameSpace).width() - snake.itemSize) {
            return null;
        }

        if (newPoint.y >= gameSpacePosition.top + $(gameSpace).height() - snake.itemSize) {
            return null;
        }
        if (newPoint.y < 0) {
            return null;
        }
        return newPoint;
    };
    var calculateNewPoint = function (position, direction, speed) {
        var newPoint = position;
        switch (direction) {
            case "up":
                newPoint.y -= speed;
                break;
            case "down":
                newPoint.y += speed;
                break;
            case "left":
                newPoint.x -= speed;
                break;
            case "right":
                newPoint.x += speed;
                break;
        }
        return newPoint;
    };

    var spawnFood = function () {
        food = snakeUtil.createItem("snake_head", snake.itemSize, null, null, { "background-color": "yellow", "width": 40, "height": 80 });
    };

    var addItemToTail = function () {
        q.push(snakeUtil.createItem("snake_head", snake.itemSize, -30, -30, { "background-color": "red", "width": 40, "height": 80 }));
    };


    var ticTac = function () {
        if (direction != "left" &&
            direction != "right" &&
            direction != "up" &&
            direction != "down")
            return;

        var newPoint = verifyWallCollision(calculateNewPoint(snakeHead.getPosition(), direction, snake.moveSpeed));
        if (newPoint) {
            var tempItem = q.pop();
            tempItem.moveToPosition(snakeHead.getPosition());
            q.unshift(tempItem);
            snakeHead.moveToPosition(newPoint);

            if (checkCollision(snakeUtil.makeRect(newPoint, snake.itemSize), food.getRect())) {
                food.remove();
                addItemToTail();
                spawnFood();
            }
        }
    };

    
    snake.start = function () {

        if (snakeHead) snakeHead.remove();
        q.forEach(function (elem) {
            elem.remove();
        });


        snakeHead = snakeUtil.createMovingItem("snake_head", snake.itemSize, snake.moveSpeed, snake.moveSpeed, { "background-color": "red", "width": 40, "height": 80 });
        q = [];
        var initial_tail_size = 5;
        for (var i = 0; i < initial_tail_size; i++) {
            addItemToTail();
        }
        snake.resume();
        spawnFood();
    };


    return snake;
}